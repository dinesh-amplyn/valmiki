import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { ScrollView, KeyboardAvoidingView, ActivityIndicator, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, Modal, } from 'react-native';
import { s } from "react-native-size-matters";
import ProfileBasic from "../../componet/profile/ProfileBasic";
import Profileseducations from "../../componet/profile/Profileseducations";
import ProfilesRelatives from "../../componet/profile/ProfilesRelatives";
import UplodeImage from "../../componet/profile/UplodeImage";
const CreateProfiles = ({ navigation, route }) => {
    const [values,setValues]=useState('Basic')
    const [statusData,setStatusData] = useState( [
        {
            id: 1,
            status: 'Basic',
            isCompleted: true,
        },
        {
            id: 2,
            status: 'Education',
            isCompleted: false,
        },
        {
            id: 3,
            status: 'Relative',
            isCompleted: false,
        },
        {
            id: 4,
            status: 'Gallery',
            isCompleted: false,
        },
    ])
    const handaldata=(itemStatus)=>{
        let newdata=[...statusData]
        for(let i =0;i<newdata.length;i++){
            if(newdata[i].status===itemStatus){
                newdata[i].isCompleted=true
                setValues(newdata[i].status)
            }
        }
        setStatusData(newdata)
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keycontainer}
        >

            <ScrollView style={styles.cantainer}>
                <View style={styles.deliveryStatusBarContainer}>
                    {statusData.map((item, index) =>
                        <View style={styles.deliveryStatusBarInnerContainer} key={item.id}>
                            {index != 0 &&
                                <View style={[styles.statusBarLine, { backgroundColor: item.isCompleted ? "orange" : "black" }]} />
                            }
                            <View style={[styles.statusIcon, { borderColor: item.isCompleted ? "orange" : "black" }]} />
                        </View>
                    )}

                </View>
                <View style={styles.deliveryStatusTextContainer}>
                    {statusData.map((item, index) =>
                        <Text key={item.id} style={[styles.deliveryStatusText, { color: item.isCompleted ? "#aaa" : "#aaa" }]}>{item.status}</Text>
                    )}
                </View>
             { values=="Basic"&&  <ProfileBasic handaldata={handaldata}/>}
             {  values=="Education"&&  <Profileseducations handaldata={handaldata}/>}
             {  values=="Relative"&&  <ProfilesRelatives handaldata={handaldata}/>}
             {  values=="Gallery"&&  <UplodeImage handaldata={handaldata}/>}

            </ScrollView>
        </KeyboardAvoidingView>
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
        fontSize:20
    },
    aboutinputcontainer: {
        borderWidth: 1,
        // paddingHorizontal:20,
        // borderRadius: s(8),

        marginTop: 12,
        backgroundColor: "#ffd470",
        borderColor: "#ccc",
        // borderRadius: 20,
        paddingVertical:40,
        fontSize:20,
        marginRight:20,
        
        
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
        fontSize:20
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
        fontSize:20,
        color:"black"
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
export default CreateProfiles