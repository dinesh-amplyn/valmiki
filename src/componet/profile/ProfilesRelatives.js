import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { ScrollView, KeyboardAvoidingView, ActivityIndicator, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, Modal, } from 'react-native';
import { s } from "react-native-size-matters";
import { useSelector } from "react-redux";
import * as ApisService from "../../providers/apis/apis";
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
const ProfilesRelatives = ({ navigation, route, handaldata, }) => {
    const userData = useSelector(state => state.userData)
    const [brother, setBrother] = useState()
    const [sisters, setSisters] = useState()
    const [relatives, setRelatives] = useState(
        [{
            name: null,
            relation: null,
            mobile: null,
            address: null,
            remark: null
        }]
    )

    const setdata = () => {

        let data = {
            profile_id: userData.user.profile_id,
            no_of_brothers: brother,
            no_of_sisters: sisters,
            relatives: relatives

        }
        console.log("data::::::::::::::::", JSON.stringify(data))
        ApisService.profilesrelatives(data)
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    handaldata("Gallery")
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    const inputchang = (i, index) => {
        let newgoter = [...relatives];
        newgoter[index].mobile = i;
        setRelatives(newgoter);
    }
    const inputchangremark = (i, index) => {
        let newgoter = [...relatives];
        newgoter[index].remark = i;
        setRelatives(newgoter);
    }
    const inputchangrelation = (i, index) => {
        let newgoter = [...relatives];
        newgoter[index].relation = i;
        setRelatives(newgoter);
    }
    const inputchangname = (i, index) => {
        let newgoter = [...relatives];
        newgoter[index].name = i;
        setRelatives(newgoter);
    }
    const inputchangnameaddress = (i, index) => {
        let newgoter = [...relatives];
        newgoter[index].address = i;
        setRelatives(newgoter);
    }
    const addmoreeducation = () => {
        if (relatives.length <= 4) {
            let newgoter = [...relatives]
            let obj = {
                address: null,
                name: null,
                relation: null,
                remark: null,
                mobile: null,
            }
            newgoter.push(obj)
            setRelatives(newgoter);
        }
    }
    const remove = (index) => {
        let newgoter = [...relatives]
        newgoter.splice(index, 1)
        setRelatives(newgoter);
    }
    return (
        <ScrollView style={styles.cantainer}>
            <View style={{ marginTop: 20, margin: 8 }}>
                <Text style={styles.outtextcontener}>no_of_brothers*</Text>
                <View style={{ paddingLeft: 20 }}>
                    < TextInput
                        style={styles.inputcontainer1}
                        placeholder="no_of_brothers"
                        autoCapitalize="none"
                        onChangeText={(e) => setBrother(e)}
                        placeholderTextColor="black"
                    // value={name}
                    />
                </View >
                <Text style={styles.outtextcontener}>no_of_sisters*</Text>
                <View style={{ paddingLeft: 20 }}>

                    < TextInput
                        style={styles.inputcontainer1}
                        placeholder="no_of_sisters"
                        autoCapitalize="none"
                        onChangeText={(e) => setSisters(e)}
                        placeholderTextColor="black"
                    // value={name}
                    />
                </View >
                <View style={{ backgroundColor: "#ffd470", marginTop: 20, margin: 8 }}>
                    <Text style={{ fontSize: 20, color: "black", textAlign: "center" }}> relatives's</Text>
                    <View style={{ backgroundColor: "white", borderWidth: 1, borderColor: "#ffd470", margin: 2, padding: 8 }}>
                        {relatives.map((i, index) => {
                            return (
                                <View style={{ paddingLeft: 20 }}>
                                    <Text style={styles.textcontainer}>remark*</Text>
                                    < TextInput
                                        style={styles.inputcontainer1}
                                        placeholder="remark"
                                        autoCapitalize="none"
                                        onChangeText={(e) => inputchangremark(e, index)}
                                        placeholderTextColor="black"
                                    // value={name}
                                    />
                                    <Text style={styles.textcontainer}>relation*</Text>
                                    < TextInput
                                        style={styles.inputcontainer1}
                                        placeholder="relation"
                                        autoCapitalize="none"
                                        onChangeText={(e) => inputchangrelation(e, index)}
                                        placeholderTextColor="black"
                                    // value={name}
                                    />
                                    <Text style={styles.textcontainer}>Mobile*</Text>
                                    < TextInput
                                        style={styles.inputcontainer1}
                                        placeholder="Mobile number"
                                        autoCapitalize="none"
                                        onChangeText={(e) => inputchang(e, index)}
                                        placeholderTextColor="black"
                                        maxLength={10}
                                        keyboardType="numeric"

                                    // value={name}
                                    />
                                    <Text style={styles.textcontainer}>Name*</Text>
                                    < TextInput
                                        style={styles.inputcontainer1}
                                        placeholder="Name"
                                        autoCapitalize="none"
                                        onChangeText={(e) => inputchangname(e, index)}
                                        placeholderTextColor="black"
                                    // value={name}
                                    />
                                    <Text style={styles.textcontainer}>address*</Text>
                                    < TextInput
                                        style={styles.inputcontainer1}
                                        placeholder="address"
                                        autoCapitalize="none"
                                        onChangeText={(e) => inputchangnameaddress(e, index)}
                                        placeholderTextColor="black"
                                    // value={name}
                                    />
                                    {/* </View > */}

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
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    cantainer: {
        flex: 1,
        marginTop: 30
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
        fontSize: 20,
        paddingLeft: 15
    },
    textcontainer: {
        fontSize: s(15),
        color: "black",
        fontWeight: "500",
        marginLeft: s(5),
        marginTop: s(40)
    },
    
   
   
    outtextcontener: {
        fontSize: s(15),
         color: "black",
          fontWeight: "400",
           marginLeft: s(18),
            marginTop: s(40)  
    },
})
export default ProfilesRelatives