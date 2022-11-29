import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, ScrollView, View, FlatList, StyleSheet, Text, Alert, Image, Button, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { s } from "react-native-size-matters";
import { useSelector, useDispatch } from "react-redux";
import * as ApisService from "../../providers/apis/apis";
import Entypo from 'react-native-vector-icons/Entypo'
import { setUserData } from "../../redux/slices/userSlice";

const Myinformation = ({ navigation }) => {
    const userData = useSelector(state => state.userData)
    const [data, setData] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        dataview()
    }, []);
    const dataitem = [
        {
            id: 1,
            title: "Name:",
            subtitle: data && data.name
        },
        {
            id: 2,
            title: "Father/Husband:",
            subtitle: data && data.father_name
        },
        {
            id: 3,
            title: "Date of Birth:",
            subtitle: data && data.dob
        },
        {
            id: 4,
            title: "gender",
            subtitle: data && data.gender
        },
        {
            id: 5,
            title: "Marital Status:",
            subtitle: data && data.marital_status_id ? data.marital_status[data.marital_status_id] : 'Unmarried'

        },
        {
            id: 6,
            title: "Education:",
            subtitle: data && data.highest_education_id
        },
        {
            id: 7,
            title: "Occupation:",
            subtitle: data && data.occupation
        },
        {
            id: 8,
            title: "current_posting",
            subtitle: data && data.current_posting
        },
        {
            id: 9,
            title: "Native Village",
            subtitle: data && data.native_village
        },
        {
            id: 10,
            title: "state",
            subtitle: data && data.state
        },
        {
            id: 11,
            title: "district",
            subtitle: data && data.district
        },

        {
            id: 13,
            title: "pincode",
            subtitle: data && data.pincode
        },
        {
            id: 14,
            title: "facebook_id",
            subtitle: data && data.facebook_id
        },
        {
            id: 15,
            title: "email",
            subtitle: data && data.email
        },
    ]
    const dataview = () => {

        ApisService.contacts_view(userData.user.contactID, userData.user.id)
            .then(response => {
                console.log('response::::', response)
                if (response.status) {
                    setData(response.data)
                    // let newuser = userData.user
                    // newuser = { ...newuser, ...response.data }
                    // dispatch(setUserData({ ...userData, user: newuser }))
                    console.log("response.data", response.data)
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    return (
        <View style={styles.cantainer}>
            <ScrollView >
                <View style={styles.textcontener} >
                    {dataitem.map((item) =>
                        <View style={{ width: "50%", marginTop: 10 }} key={item.id}>
                            <Text style={{ color: "black", fontWeight: "600", fontSize: 18, }}>{item.title}</Text>
                            <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, }}>{item.subtitle}</Text>
                        </View>
                    )}
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: "#aaa" }} />
                <View style={{ margin: 20 }}>
                    <Text style={{ color: "black", fontWeight: "600", fontSize: 18, }}>primary_number:</Text>
                    <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, width: "50%" }}>{data.primary_number}</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: "#aaa", marginBottom: 70 }} />
                <TouchableOpacity style={{ marginBottom: 30, alignItems: "center" }} onPress={() => navigation.navigate("Updatecontect", { value: data })} >
                    <Text style={{ fontSize: 20, color: "#fff", backgroundColor: "#ffd470", borderRadius: 20, width: "60%", height: 55, textAlign: "center", padding: 15 }}>
                        EDIT INFORMATION
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    cantainer: {
        flex: 1,
    },

    imagecontener: {
        width: 150,
        height: 150,
        borderRadius: s(100),
    },
    textcontener: {
        flexDirection: "row",
        flexWrap: 'wrap',
        marginLeft: 15,
        marginTop: 15

    },


}
)

export default Myinformation