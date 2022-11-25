import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { s, ms, vs } from "react-native-size-matters";
import { useSelector, useDispatch } from "react-redux";
import * as ApisService from "../providers/apis/apis";
import Gander from "../componet/Gander"
import State from "../componet/State";
import DatePicker from 'react-native-date-picker'
import { getCurrentDateTime, formatedDateTime } from "../providers/global/global";
import { setUserData } from "../redux/slices/userSlice";

import ImagePicker from 'react-native-image-crop-picker';
import Distices from "./Distices";

const ContectModal = (props) => {
    console.log("@@@@@@@@@@@@@@@@@@@@@")
    const userData = useSelector(state => state.userData)
    const dispatch = useDispatch()
    const { handeldata, selectdata, setModalVisible, isModalVisible, setIsSelected, navigation } = props
    const [data, setData] = useState({})

    const [image, setImage] = useState(null)
    const [name, setName] = useState()
    const [startDate, setStartDate] = useState(null);
    const [datepiker, setDatepiker] = useState(false)
    const [stateid, setStateid] = useState()
    const [email, setEmail] = useState()
    const [staticdata, setStaticdata] = useState()
    const [gander, setGander] = useState(null);
    const [state, setState] = useState();
    const [district, setDistrict] = useState();
    useEffect(() => {
        staticitem()
        citiesstatess()
    }, [])
    const staticitem = () => {
        ApisService.allstaiclist()
            .then(response => {
                // console.log("response::::", response)
                if (response.status) {
                    setStaticdata(response)
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    const citiesstatess = () => {
        ApisService.citiesstates()
            .then(response => {
                // console.log("response::::", response)
                if (response.status) {
                    // navigation.navigate("TopTab")
                    setState(response)
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    const apidata = () => {

        let data = new FormData();

        data.append('image', {
            name: image.modificationDate + '.jpg',
            type: image.mime,
            uri: Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path,
        });
        data.append('user_id', userData.user.id);
        data.append("primary_number", userData.user.mobile)
        data.append('name', name);
        data.append("dob", formatedDateTime(startDate, "YYYY-MM-DD"));
        data.append("state_id", stateid);
        data.append("email", email);
        data.append("gender", gander);
        data.append("district_id", district);
        // console.log("data::::::::::::::::", JSON.stringify(data))
        ApisService.contacts_create(data)
            .then(response => {
                if (response.status) {
                    // setData(response)
                    let newuser = userData.user
                    newuser = { ...newuser, ...response }
                    dispatch(setUserData({ ...userData, user: newuser }))
                    setModalVisible(false)
                    console.log("+++++++++++++++++++++++++++++++++", newuser)
                    // console.log("response::::", response)
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    const uploaded = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setImage(image)
            // console.log(image);
        });
    }
    const datee = new Date()

    const Handaldistce = useCallback(() => {
        return (
            <Distices setDistrict={setDistrict} district={district} data={state && state.cities[stateid]} stateid={stateid} />
        )
    }, [stateid])
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
                setModalVisible(isModalVisible);
            }}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(!isModalVisible)}>
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback>
                        <View style={{
                            ...styles.modalView
                        }}>
                            <ScrollView style={styles.cantainer}>
                                <TouchableOpacity style={styles.ImagePickercantainer} onPress={() => uploaded()}>
                                    <Image
                                        style={styles.imagecontener}
                                        source={{ uri: image ? image.path.replace("localhost", "192.168.29.196") : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" }} />
                                </TouchableOpacity>
                                <View style={{ paddingLeft: 20 }}>
                                    < TextInput
                                        style={styles.inputcontainer}
                                        placeholder="Name"
                                        autoCapitalize="none"
                                        onChangeText={(e) => setName(e)}
                                        placeholderTextColor="black"
                                    // value={name}
                                    />
                                </View>
                                <View >
                                    <TouchableOpacity onPress={() => setDatepiker(!datepiker)} style={{ paddingLeft: 20, }}>
                                        <Text style={styles.inertextcontainer}>{startDate ? formatedDateTime(startDate, "YYYY-MM-DD") : "DOB"}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ paddingLeft: 20, marginTop: 16 }}>
                                    <TouchableOpacity >
                                        {staticdata && <Gander gander={gander} setGander={setGander} data={staticdata.genders} />}
                                    </TouchableOpacity>
                                </View>
                                <View style={{ paddingLeft: 20, marginTop: 16 }}>
                                    <TouchableOpacity >
                                        {state && <State setStateid={setStateid} stateid={stateid} data={state.states} />}

                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={{ paddingLeft: 20, marginTop: 16 }}>
                                    <Handaldistce />
                                </TouchableOpacity>
                                <View style={{ paddingLeft: 20 }}>
                                    < TextInput
                                        style={styles.inputcontainer}
                                        placeholder="Email Address (Optional)"
                                        autoCapitalize="none"
                                        onChangeText={(e) => setEmail(e)}
                                        placeholderTextColor="black"
                                    // value={email}
                                    />
                                    <View style={{ flexDirection: "row", marginBottom: 30, justifyContent: "space-between" }}>
                                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                                            <Text style={{ marginRight: 25, fontSize: 18, fontWeight: "bold", padding: 7, borderWidth: 1, borderColor: "#ffd470", color: "#ffd470", marginTop: 25, height: 40, borderRadius: 20 }}>SKIP NOW</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => apidata()}>
                                            <Text style={{ fontSize: 18, fontWeight: "bold", padding: 7, borderWidth: 1, borderColor: "#ffd470", color: "#ffd470", height: 40, marginTop: 25, marginRight: 26, borderRadius: 20 }}>ADD CONTACT</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View >
                                <DatePicker
                                    modal
                                    open={datepiker}
                                    date={datee}
                                    value={startDate}
                                    onConfirm={(date) => {
                                        setStartDate(date)
                                        setDatepiker(!datepiker)
                                    }}
                                    onCancel={() => {
                                        console.log("date")
                                    }}
                                    mode={"date"}
                                />
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
const styles = StyleSheet.create({
    SelectDropdown: {
        backgroundColor: "red"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        borderWidth: s(1),
        borderColor: "#ffd470",
        height: '80%',
        width: "95%",
        backgroundColor: "#fff"

    },
    cantainer: {
        flex: 1,
        marginTop: 30
    },
    ImagePickercantainer: {
        alignSelf: "center",
        // marginTop: s(20)
    },
    imagecontener: {
        width: s(150),
        height: s(150),
        borderRadius: s(100),
        borderWidth: s(5),
        borderColor: "#ffd470",
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
        color: "black",
        marginRight: 60

    },
})
export default ContectModal