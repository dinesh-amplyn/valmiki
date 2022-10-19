import React, { useState } from "react";
import { ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { s, ms, vs } from "react-native-size-matters";
import * as ApisService from "../providers/apis/apis";
import { useSelector } from "react-redux";

const Report = ({route,navigation}) => {
    const {values} = route.params
    const userData = useSelector(state => state.userData)
    const [discription, setDiscription] = useState()
    const [data, setData] = useState();
    const [isSelected, setIsSelected] = useState("type")

    const Submitdata = () => {
        let data={
            user_id:userData.user.id,
            description:discription,
            action_id:values.id,
            action_type:isSelected
        }
        ApisService.CreateReport(data)
            .then(response => {
                console.log('response::::', response)
                if (response.status) {
                    navigation.goBack()
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    return (
        <View>
            <Text style={styles.textcontaner}>Description</Text>
            <View style={styles.inercontener}>
                < TextInput
                    style={styles.inputcontainer}
                    placeholder="Tell us more about your problem with this news."
                    autoCapitalize="none"
                    onChangeText={(numeric) => setDiscription(numeric)}
                    placeholderTextColor="black"
                    multiline={true}
                />
            </View>
          
            <TouchableOpacity style={{ alignItems: "center" }} onPress={() => Submitdata()}>
                <Text style={{ fontSize: 19, color: "#fff", fontWeight: "500", textAlign: "center", borderWidth: 0, width: "40%", padding: 10, borderRadius: 8, backgroundColor: "#ffd470" }}>SUBMIT</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    textcontaner: {
        fontSize: 22,
        color: "black",
        fontWeight: "500",
        margin: 14
    },
    inputcontainer: {
        fontSize: 15,
         color: "black",
         fontWeight: "500",
         borderWidth: 1,
        width: "90%",
        height: "70%",
        justifyContent: "center",
        alignItems: "center",
        margin: 18,
        borderRadius: 8,
        borderColor: "#aaa",
        // padding:5
    }

})
export default Report