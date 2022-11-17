import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { ScrollView, KeyboardAvoidingView, ActivityIndicator, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, Modal, } from 'react-native';
import { s } from "react-native-size-matters";
import { useSelector } from "react-redux";
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import * as ApisService from "../../providers/apis/apis";

import Education from "../../componet/Education";
const Profileseducations = ({ navigation, route, handaldata }) => {
    const userData = useSelector(state => state.userData)
    const [staticdata, setStaticdata] = useState()
    const [education, setEducation] = useState([{
        education_id: null,
        passing_year: null,
        institute: null,
    }])


    useEffect(() => {
        staticitem()
    }, [])

    const staticitem = () => {
        ApisService.allstaiclist()
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    setStaticdata(response)
                }
            }).catch(error => {
                alert(error.message);
            });
    }

    const setdata = () => {

        let data = {
            profile_id: userData.user.profile_id,
            educations:education
        }
        console.log("data::::::::::::::::", JSON.stringify(data))
        ApisService.profileseducations(data)
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    handaldata("Relative")

                }
            }).catch(error => {
                alert(error.message);
            });
    }
    const inputchang = (i, index) => {
        let newgoter = [...education];
        newgoter[index].passing_year = i;
        setEducation(newgoter);
    }
    const inputchanginstitute = (i, index) => {
        let newgoter = [...education];
        newgoter[index].institute = i;
        setEducation(newgoter);
    }
    const addmoreeducation = () => {
        if (education.length <= 4) {
            let newgoter = [...education]
            let obj = {
                education_id: null,
                passing_year: null,
                institute: null,
            }
            newgoter.push(obj)
            setEducation(newgoter);
        }
    }
    const remove = (index) => {
        let newgoter = [...education]
        newgoter.splice(index, 1)
        setEducation(newgoter);
    }

    return (
        <ScrollView style={styles.cantainer}>
            <View style={{ backgroundColor: "#ffd470", marginTop: 20, margin: 8 }}>
                <Text style={{ fontSize: 20, color: "black", textAlign: "center" }}> education's</Text>
                <View style={{ backgroundColor: "white", borderWidth: 1, borderColor: "#ffd470", margin: 2, padding: 8 }}>
                    {education.map((i, index) => {
                        return (
                            <View style={{ paddingLeft: 20 }}>
                                <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginBottom: 20 }}>education type*</Text>
                                <TouchableOpacity>
                                    {staticdata && <Education setEducation={setEducation} education={education} data={staticdata.educations} index={index} type={"education"} />}

                                </TouchableOpacity>
                                <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginTop: s(20) }}>education year*</Text>
                                < TextInput
                                    style={styles.inputcontainer1}
                                    placeholder="passing year"
                                    autoCapitalize="none"
                                    onChangeText={e => inputchang(e, index)}
                                    placeholderTextColor="black"
                                    maxLength={4}
                                // value={i}
                                />
                                <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginTop: s(20) }}>education institute*</Text>
                                < TextInput
                                    style={styles.inputcontainer1}
                                    placeholder="institute name"
                                    autoCapitalize="none"
                                    onChangeText={e => inputchanginstitute(e, index)}
                                    placeholderTextColor="black"
                                    maxLength={50}
                                // value={i}        
                                />
                                {index ? <TouchableOpacity onPress={() => remove(i, index)} style={{ position: "absolute", bottom: 8, right: 0 }}>
                                    <Entypo style={styles.arrowIcon} name={"circle-with-cross"} size={s(30)} color="white" />
                                </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => addmoreeducation()} style={{ position: "absolute", bottom: 1, right: 15 }}>
                                        <Fontisto style={styles.arrowIcon} name={"plus-a"} size={s(42)} color="white" />
                                    </TouchableOpacity>
                                }
                            </View>
                        )
                    })}
                </View>
            </View>
            <TouchableOpacity onPress={() => setdata()} style={{ justifyContent: "center", alignItems: "center", margin: 40 }}>
                <Text style={{ fontSize: 22, borderWidth: 1, width: "85%", textAlign: "center", borderRadius: 10, backgroundColor: "#ffd470", color: "white" }}>SUBMIT & CONTINUE</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    cantainer: {
        flex: 1,
        marginTop: 30
    },
    imagecontener: {
        width: s(150),
        height: s(150),
        borderRadius: s(100),
        borderWidth: s(5),
        borderColor: "#ffd470",
    },
    ImagePickercantainer: {
        alignSelf: "center",
        marginTop: s(20)
    },
    inputcontainer: {
        borderWidth: 1,
        width: "95%",
        // borderRadius: s(8),
        marginTop: 12,
        backgroundColor: "#ffd470",
        borderColor: "#ccc",
        borderRadius: 20,
        height: 50,
        fontSize: 20
    },
    aboutinputcontainer: {
        borderWidth: 1,
        // paddingHorizontal:20,
        // borderRadius: s(8),

        marginTop: 12,
        backgroundColor: "#ffd470",
        borderColor: "#ccc",
        // borderRadius: 20,
        paddingVertical: 40,
        fontSize: 20,
        marginRight: 20,
    },
    inputcontainer1: {
        borderWidth: 1,
        width: "95%",
        borderRadius: s(8),
        marginTop: 12,
        backgroundColor: "#ffd470",
        borderColor: "#ccc",
        borderRadius: 20,
        height: 50,
        fontSize: 20
    },
    textcontainer: {
        fontSize: s(15),
        color: "black",
        fontWeight: "400",
        marginLeft: s(18),
        marginTop: s(20)
    },
    inertextcontainer: {
        borderWidth: 1,
        borderColor: "#bbb",
        width: "95%",
        height: 50,
        borderRadius: 20,
        marginTop: 15,
        padding: 10,
        paddingRight: 40,
        backgroundColor: "#ffd470",
        fontSize: 20,
        color: "black"
    },
    inputcontainer3: {
        borderWidth: 1,
        borderColor: "#bbb",
        width: "95%",
        // height: "40%",
        borderRadius: 20,
        // marginTop: 15,
        // padding: 15,
        paddingRight: 40,
    },
    keycontainer: {
        flex: 1
    },
    arrowIcon: {
        borderRadius: 20,
        backgroundColor: "#ffd470",
    },
    deliveryStatusBarContainer: {
        flexDirection: 'row',
        // marginBottom: s(14),
        // marginTop: s(-14),
        justifyContent: 'center'
    },
    deliveryStatusBarInnerContainer: {
        flexDirection: 'row',
    },
    statusBarLine: {
        height: s(1),
        width: s(70),
        alignSelf: 'center',
        backgroundColor: "black"
    },
    statusIcon: {
        borderRadius: 100,
        width: 20,
        height: 20,
        backgroundColor: "#fff",
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: "orange"
    },
    deliveryStatusTextContainer: {
        flexDirection: 'row',
        paddingHorizontal: s(8),
        justifyContent: 'space-evenly',
        paddingBottom: s(15),
        borderBottomWidth: s(0.6),
        borderBottomColor: "#aaa"
    },
})
export default Profileseducations