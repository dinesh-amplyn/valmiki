import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, Platform, View, Switch, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { s } from "react-native-size-matters";
import { useSelector } from "react-redux";
import * as ApisService from "../../providers/apis/apis";
import { ScrollView } from "react-native-gesture-handler";
import EventType from "../../componet/EventType";
import DatePicker from 'react-native-date-picker'
import { getCurrentDateTime, formatedDateTime } from "../../providers/global/global";
import EventMulti from "../../componet/EventMulti";

const GetNotification = ({ navigation, route }) => {

    const userData = useSelector(state => state.userData)
useEffect(()=>{
    updatenews()
},[])
    const [isSelected, setIsSelected] = useState({});
    const updatenews = () => {
       
        ApisService.getnotification(userData.user.id)
            .then(response => {
                if (response.status) {
                    // navigation.navigate("AayojanTab")
                    setIsSelected(response)
                    console.log("response::::", response)

                }
            }).catch(error => {
                alert(error.message);
            });
    }



    return (

        <ScrollView style={styles.maincontainer}>
            <View style={styles.containerSwitch}>
                <Text style={{fontSize:20,color:"black",textAlign:"center",alignSelf:"center"}}>no record found </Text>
            </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    maincontainer: {
        flex: 1
    },

    containerSwitch: {
        // flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15
    }
})
export default GetNotification