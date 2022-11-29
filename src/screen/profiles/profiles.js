import React, { useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, View, FlatList, ScrollView, StyleSheet, Text, StatusBar, Image, Alert, ImageBackground, TouchableOpacity, TextInput, } from 'react-native';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { s } from "react-native-size-matters";
import * as ApisService from "../../providers/apis/apis";
import { useSelector } from "react-redux";
import { getCurrentDateTime, formatedDateTime } from "../../providers/global/global";
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import UserContant from '../../componet/UserContant'
const profiles = ({ navigation }) => {


    const userData = useSelector(state => state.userData)
    const [data, setData] = useState([])
    const [filter, setFilter] = useState()
    const [searchitem, setSearchitem] = useState()
    const [loader, setLoader] = useState(false);
    const [discription, setDiscription] = useState()
    const [isModalVisible, setModalVisible] = useState(false);

    useLayoutEffect(() => {
        setHeader()
    }, [])

    useEffect(() => {
        myProfile();
    }, []);


    const alldata = [
        {
            id: 1,
            title: "name",
            subtitle: data.length > 0 && data[0].name,
        },

        {
            id: 2,
            title: "is_paid",
            subtitle: data.length > 0 && data[0].is_paid,
        },
        {
            id: 3,
            title: "marital_status",
            subtitle:data && data.marital_status_id? data.marital_status[data.marital_status_id] : 'Unmarried'
        },
        {
            id: 4,
            title: "is_match_found",
            subtitle: data.length > 0 && data[0].is_match_found,
        },
        {
            id: 5,
            title: "dob",
            subtitle: data.length > 0 && data[0].dob,
        },
        {
            id: 6,
            title: "birth_time",
            subtitle: data.length > 0 && data[0].birth_time,
        },
        {
            id: 7,
            title: "gender",
            subtitle: data.length > 0 && data[0].gender,
        },
        {
            id: 8,
            title: "gotras_string",
            subtitle: data.length > 0 && data[0].gotras_string,
        },
        {
            id: 9,
            title: "highest_education",
            subtitle: data.length > 0 && data[0].highest_education,
        },
        {
            id: 10,
            title: "job",
            subtitle: data.length > 0 && data[0].job,
        },
        {
            id: 11,
            title: "father_name",
            subtitle: data.length > 0 && data[0].father_name,
        },
        {
            id: 12,
            title: "district",
            subtitle: data.length > 0 && data[0].district,
        },
        {
            id: 13,
            title: "height",
            subtitle: data.length > 0 && data[0].height,
        },

    ]

    const openDrawer = () => {
        navigation.openDrawer()
    }
    const setHeader = () => {
        navigation.setOptions({
            title: 'विवाहिकी ',
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#ffd470',

            },
            headerLeft: () => (
                <View>
                    <TouchableOpacity style={styles.headerLeft} onPress={() => openDrawer()}>
                        <Ionicons name="ios-reorder-three-sharp" size={s(32)} color='#fff' />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }} onPress={() => setModalVisible(true)}>
                    <Ionicons name="md-information-circle-outline" size={s(22)} color="#fff" />
                </TouchableOpacity>
            ),
        })
    }



    const myProfile = () => {
        console.log('resp::::')

        const data = {
            params: {
                user_id: userData.user.id,
                // profile_number: userData.user.profile_number
            }
        };
        ApisService.my_profiles(data)

            .then(response => {
                if (response.status) {
                    setData(response.data);
                    console.log('response::::', response.data)

                }
            }).catch(error => {
                alert(error.message)

            });
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("ProfileView", { value: data })}>
                    <View style={{ padding: 20, backgroundColor: "#ffd470", borderRadius: 10, alignItems: "center", justifyContent: "center", width: "95%", margin: 9 }}>
                        <Image
                            style={styles.imagecontener}
                            source={{ uri: data &&data.image && data.image[0].replace("localhost", "192.168.29.196") }} />
                           { console.log(data.image)}
                    </View>
                    <View style={styles.textcontener} >
                        {
                            alldata.map((item) =>
                                <View style={{ width: "50%", marginTop: 10 }} key={item.id}>
                                    <Text style={{ color: "black", fontWeight: "600", fontSize: 18, }}>{item.title}</Text>
                                    <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, }}>{item.subtitle}</Text>
                                </View>
                            )
                        }
                    </View>
                </TouchableOpacity>
                <View style={{ borderBottomWidth: 1, borderColor: "#aaa" }} />

                <View style={styles.newscontainer}>

                    <Text style={{ fontSize: 20, color: "#fff", fontWeight: "700", width: "90%", alignSelf: "center", textAlign: "center", marginLeft: 20 }}>उपयुक्त वर - वधू की खोज करने के लिए कृपया अपने लड़के - लड़की की प्रोफाइल को जोड़ें</Text>
                    <View style={{ marginTop: 20 }} >
                        <TouchableOpacity onPress={() => navigation.navigate("CreateProfiles")} style={{ borderWidth: 0, backgroundColor: "#fff", width: "90%", height: 60, borderRadius: 50, alignSelf: "center", textAlign: "center", justifyContent: "center", alignItems: "center",margin:10 }}>
                            <Entypo name="add-user" size={s(20)} color='#64e295' />

                            <Text style={{ color: "black", fontSize: 15, fontWeight: "normal" }}> add new profile</Text>
                        </TouchableOpacity>
                    </View>
                    <UserContant isModalVisible={isModalVisible} setModalVisible={setModalVisible} navigation={navigation} />
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inercontainer: {
        marginTop: s(10),
        borderWidth: 1,
        borderColor: "#aaa",
        backgroundColor: "#fff",
        width: "90%",
        alignItems: "center",
        fontWeight: "600",
        fontSize: 17,
        flexDirection: "row",
        marginLeft: 23,
    },
    textcontainer: {
        marginTop: s(10),
        borderWidth: 0,
        backgroundColor: "#eee",
        borderRadius: s(8),
        paddingHorizontal: s(40),
        paddingVertical: s(8),
    },
    textcontainer1: {
        fontWeight: "500",
        alignItems: "center",
        alignSelf: "center",
        borderWidth: 0,
        backgroundColor: "#ffd470",
        borderRadius: s(100),
        paddingHorizontal: s(5),
        paddingVertical: s(8),
        marginTop: s(6),
        color: "white"
    },
    maincontainer: {
    },
    newscontainer: {
        marginBottom: 30,
        borderWidth: 2,
        borderColor: "#ffd470",
        borderRadius: 10,
        width: "95%",
        // height: "30%",
        // flexDirection: "row",
        margin: 9,
        backgroundColor: "#ffd470",
        marginTop: 30,
        shadowOffset: {
            width: 10,
            height: -5
        },
        shadowOpacity: 5,
        shadowRadius: 20,
        shadowColor: "black",
        elevation: 5
    },
    imagecontener: {
        width: 150,
        height: 150,
        borderRadius: s(100),
        backgroundColor: "#fff",
        alignSelf: "center",
    },
    inputcontainer: {
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "#fff",
        width: "90%",
        alignItems: "center",
        fontWeight: "600",
        fontSize: 17,
    },
    orderDetailsText: {
        fontWeight: "600",
        color: "black",
        backgroundColor: "#ffd470",
        borderWidth: 0,
        margin: 10,
        borderRadius: 2,
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    textcontener: {
        flexDirection: "row",
        flexWrap: 'wrap',
        marginLeft: 15,
        marginTop: 15

    },
}
)
export default profiles