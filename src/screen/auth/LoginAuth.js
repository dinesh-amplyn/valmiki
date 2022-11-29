import React, { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { s } from "react-native-size-matters";
import * as customvilidation from '../../providers/shared/Validater';
import * as ApisService from "../../providers/apis/apis";
const LoginAuth = ({ navigation }) => {
    const [mobile, setMobile] = useState()
    const [errors, setErros] = useState();
    const storeData = () => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        let errors = validateForm()
        if (errors == null) {
            sendOtp()
        }
        else (
            setErros(errors)
        )
    }
    const validateForm = () => {
        let errors = {};
        if (customvilidation.isEmpty(mobile)) {
            errors.mobile = "mobile can't be blank"
        }
        else if (!customvilidation.isLength(mobile, 'mobile')) {
            errors.mobile = 'number not valid'
        }
        console.log('validation errors::::', errors);
        if (customvilidation.isEmpty(errors)) {
            return null;
        } else {
            return errors;
        }
    }
    const sendOtp = () => {
        let data = {mobile: mobile }
        ApisService.sendOtp(data)
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    // setMobile(response.data)
                    navigation.navigate("OtpAuth", { mobile: mobile })
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    return (
        < View style={styles.container}>
            < TextInput
                style={styles.inputcontainer}
                placeholder="Mobile Number"
                keyboardType="numeric"
                autoCapitalize="none"
                onChangeText={(numeric) => setMobile(numeric)}
                placeholderTextColor={"#bbb"}
                maxLength={10}
            />
            {errors && <Text style={{ color: "red" }}> {errors.mobile}</Text>}
            <TouchableOpacity onPress={storeData} style={{ borderWidth: 0, backgroundColor: "rgb(125,226,78)", marginTop: 10, marginHorizontal: s(100), alignItems: "center", justifyContent: "center", height: 50 }}>
                <Text style={{ fontSize: 18, color: "white" }}>Submit</Text>
            </TouchableOpacity> 
            
            <View style={styles.termContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("TramConditon")}>
                    <Text style={{ fontSize: 17, color: "white" }}> Term & Conditions</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(48,126,204)',
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: s(20),
    },
    inputcontainer: {
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        borderColor: "#aaa",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 20,
        // backgroundColor:"rgb(125,226,78)"
    },
    termContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: s(50),
    }
})
export default LoginAuth