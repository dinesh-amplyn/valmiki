import React, { useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Alert, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { s } from "react-native-size-matters";
import * as ApisService from "../../providers/apis/apis";
import { useSelector } from "react-redux";
import { getCurrentDateTime, formatedDateTime } from "../../providers/global/global";
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import UserContant from '../../componet/UserContant'
const ContectList = ({ navigation }) => {

    useLayoutEffect(() => {
        setHeader()
    }, [])
    const userData = useSelector(state => state.userData)
    const [data, setData] = useState()
    const [filter, setFilter] = useState()
    const [searchitem, setSearchitem] = useState()
    const [loader, setLoader] = useState(false);
    const [discription, setDiscription] = useState()
    const [isModalVisible, setModalVisible] = useState(false);

    // const[image,setImage]=useState()


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

    return (
        <View style={styles.newscontainer}>
            <Text style={{fontSize:20,color:"#fff",fontWeight:"700",width:"90%",alignSelf:"center",textAlign:"center",marginLeft:20}}>उपयुक्त वर - वधू की खोज करने के लिए कृपया अपने लड़के - लड़की की प्रोफाइल को जोड़ें</Text>
            <View style={{ width: "90%", height: 60, position: "absolute", bottom: -35, left: 20 }} >
                <TouchableOpacity onPress={()=>navigation.navigate("CreateProfiles")}  style={{ borderWidth: 0, backgroundColor: "#fff", width: "90%", height: 60, borderRadius: 50,alignSelf: "center",textAlign:"center",justifyContent:"center",alignItems:"center"}}>
                <Entypo name="add-user" size={s(20)} color='#64e295' />

                    <Text style={{ color:"black",fontSize:15,fontWeight:"normal" }}> add new profile</Text>
                </TouchableOpacity>
            </View>
            <UserContant isModalVisible={isModalVisible} setModalVisible={setModalVisible} navigation={navigation} />
        </View>
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
        borderWidth: 2,
        borderColor: "#ffd470",
        borderRadius: 10,
        width: "95%",
        height: "50%",
        flexDirection: "row",
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
        width: 90,
        height: 95,
        borderRadius: s(100),
        marginTop: 10
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
    drawerItem: {
        flexDirection: "row",
        backgroundColor: "#ffd470"
    },
    arrowIcon: {

        borderRadius: 100,
        backgroundColor: "#ffd470",
    }
}
)
export default ContectList