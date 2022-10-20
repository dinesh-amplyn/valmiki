import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { s } from "react-native-size-matters";
import { useSelector } from "react-redux";
import * as ApisService from "../providers/apis/apis";
import { getCurrentDateTime, formatedDateTime } from "../providers/global/";

const AllDetail = ({ route, navigation }) => {
    const userData = useSelector(state => state.userData)
    const [data, setData] = useState({})
    const { Announcedata } = route.params
    useEffect(() => {
        dataview()
    }, []);
    const dataview = () => {
        ApisService.announcementdeatil(Announcedata)
            .then(response => {
                // console.log('response::::', response)
                if (response.status) {
                    setData(response.data)
                    // console.log("response.data", response.data)
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    const deletedata = () => {
        let data = {
            user_id: userData.user.id,
            id: Announcedata
        }
        ApisService.announcementdelete(data)
            .then(response => {
                // console.log('response::::', response)
                if (response.status) {
                    // setData(response.data)
                    // console.log("response.data", response.data)
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    return (
        <ScrollView style={styles.cantainer}>
            <Image
                style={styles.imagecontener}
                source={{ uri: data && data.image && data.image.replace("localhost", "192.168.29.196") }} />
            <View style={{ backgroundColor: "black", width: "100%", height: 180 }}>
                <View style={{ flexDirection: "row", alignSelf: "center", marginRight: 20, marginTop: 15 }}>
                    <Text style={{ fontSize: 25, color: "#fff" }}>{data.name_indicator}</Text>
                    <Text style={{ fontSize: 25, color: "#fff" }}>{data.name}</Text>
                </View>
                <View style={{ alignSelf: "center", marginTop: 15 }}>
                    <Text style={{ fontSize: 15, color: "#fff" }}>जन्म_दिवस :    {data.date_of_birth}</Text>
                    <Text style={{ fontSize: 15, color: "#fff" }}>मृत्यु तिथि :      {data.date_of_death}</Text>
                    <Text style={{ fontSize: 15, color: "#fff", marginTop: 15, marginLeft: 50 }}>मूल गांव : {data.native_village}</Text>
                </View>
            </View>
            <View style={styles.maincantainer}>
                <Text style={styles.hadingcantant}>शोक संदेश</Text>
                <Text style={{ fontSize: 18, color: "black", marginLeft: 10 }}>{data.condolence_message}</Text>
            </View>
            <View style={styles.maincantainer}>
                <Text style={styles.hadingcantant}>शोक कार्यक्रम</Text>
                <View style={{ flexDirection: "row" }}>
                    <View>
                        <Text style={{ fontSize: 18, color: "black", marginLeft: 10 }}>शोक कार्यक्रम:</Text>
                        <Text style={{ fontSize: 18, color: "#aaa", fontWeight: "bold", marginLeft: 10 }}>{data.event_name}</Text>
                    </View>
                    <View style={{ marginLeft: 60 }}>
                        <Text style={{ fontSize: 18, color: "black", marginLeft: 10 }}>दिनांक:</Text>
                        <Text style={{ fontSize: 18, color: "#aaa", fontWeight: "bold", marginLeft: 10 }}>{data.event_datetime}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 18 }}>

                    <Text style={{ fontSize: 18, color: "black", marginLeft: 10 }}>पता:</Text>
                    <Text style={{ fontSize: 18, color: "#aaa", fontWeight: "bold", marginLeft: 10 }}>{data.event_place}</Text>
                </View>
            </View>
            <View style={styles.maincantainer}>
                <Text style={styles.hadingcantant}>मोबाइल</Text>
                <Text style={{ fontSize: 18, color: "black", marginLeft: 10 }}>mobile:</Text>
                <Text style={{ fontSize: 18, color: "#aaa", marginLeft: 10 }}>{data.mobiles}</Text>
            </View>
            <View style={styles.maincantainer}>
                <Text style={styles.hadingcantant}>शोककुल</Text>
                <Text style={{ fontSize: 18, color: "#aaa", marginLeft: 10 }}>{data.mourning_family}</Text>
            </View>
            <View style={styles.maincantainer}>
                <Text style={{ fontSize: 18, color: "black", margin: 10, fontWeight: "bold" }}>posted by : {data.owner_name}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 30 }}>

                {data.user_id == userData.user.id &&
                    <>
                        <TouchableOpacity onPress={() => navigation.navigate("DetailPage", { values: data })} style={{ marginLeft: "auto", marginRight: 20 }}>
                            <Text style={{ fontSize: 22, color: "#ffd470", fontWeight: "600" }}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => deletedata()} style={{ marginRight: 20 }}>
                            <Text style={{ fontSize: 22, color: "#ffd470", fontWeight: "600" }}>Delete</Text>
                        </TouchableOpacity>
                    </>
                }
                {data.user_id !== userData.user.id && <TouchableOpacity onPress={() => navigation.navigate("Report", { values: data })} style={{ marginLeft: 15 }}>
                    <Text style={{ fontSize: 22, color: "#ffd470", fontWeight: "600" }}>REPORT</Text>
                </TouchableOpacity>}
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    cantainer: {
        flex: 1,
    },
    inercantainer: {
        borderWidth: 0,
        backgroundColor: "#ffd470",
        fontSize: 18,
        width: 50,
        borderRadius: 8,
        textAlign: "center",
        position: "absolute",
        left: 5,
        top: 5
    },
    imagecontener: {
        width: "100%",
        height: 220,
    },
    hadingcantant: {
        fontSize: 17,
        color: "black",
        fontWeight: "bold",
        margin: 10,
    },
    maincantainer: {
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 10,
        width: "95%",
        margin: 10,
        backgroundColor: "#fff",
        shadowOffset: {
            width: 10,
            height: -5
        },
        shadowOpacity: 5,
        shadowRadius: 20,
        shadowColor: "black",
        elevation: 5
    }

}
)

export default AllDetail