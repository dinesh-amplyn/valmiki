import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, ScrollView, View, FlatList, StyleSheet, Text, Alert, Image, Button, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { s } from "react-native-size-matters";
import { useSelector } from "react-redux";
import * as ApisService from "../../providers/apis/apis";
import Entypo from 'react-native-vector-icons/Entypo'
const dataicon = [
    {
        id: 1,
        icon: "message",
        title: "Message"
    },
    {
        id: 2,
        icon: "mail",
        title: "Report"
    },
]
const ContectView = ({ route, navigation }) => {
    const userData = useSelector(state => state.userData)
    const [data, setData] = useState({})
    const { value } = route.params
    useEffect(() => {
        dataview()
    }, []);
    const dataitem = [
        {
            id: 1,
            title: "father/husband",
            subtitle:data && data.father_husband_name
        },
        {
            id: 2,
            title: "Age",
            subtitle:data && data.age
        },
        {
            id: 3,
            title: "gender",
            subtitle: data &&data.gender
        },
        {
            id: 4,
            title: "marital_status",
            subtitle:data && data.marital_status_id? data.marital_status[data.marital_status_id] : 'Unmarried'
        },
        {
            id: 5,
            title: "education",
            subtitle: data &&data.education
        },
        {
            id: 6,
            title: "occupation",
            subtitle: data &&data.occupation
        },
        {
            id: 7,
            title: "current_posting",
            subtitle:data && data.current_posting
        },
        {
            id: 8,
            title: "native_village",
            subtitle: data &&data.native_village
        },
        {
            id: 9,
            title: "current_address",
            subtitle:data && data.current_address
        },
        {
            id: 10,
            title: "state",
            subtitle:data && data.state
        },
        {
            id: 11,
            title: "district",
            subtitle:data && data.district
        },
        {
            id: 12,
            title: "pincode",
            subtitle:data && data.pincode
        },
        {
            id: 13,
            title: "facebook_id",
            subtitle: data &&data.facebook_id
        },
        {
            id: 14,
            title: "email",
            subtitle:data && data.email
        },
    ]
    const dataview = () => {
        ApisService.contactsview(value)
            .then(response => {
                console.log('response::::', response)
                if (response.status) {
                    setData(response.data)
                    console.log("response.data", response.data)
                }
            }).catch(error => {
                alert(error.message);
            });
    }

    const handaldata = ( item ) => {
        console.log("item",item)
        if (item.icon == "mail") {
            navigation.navigate('Report', { values: item.id })
        }
    }
    return (
        <View style={styles.cantainer}>
            <ScrollView >

                <View style={{ backgroundColor: "#ffd470", borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                    <Image
                        style={styles.imagecontener}
                        source={{ uri: data && data.image && data.image.replace("localhost", "192.168.29.196") }} />
                    <Text style={{ fontSize: 19, fontWeight: "bold", color: "#fff", padding: 10 }}>{data.name}</Text>
                </View>
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
                    <Text style={{ color: "black", fontWeight: "600", fontSize: 18, }}>Contect Number:</Text>
                    <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, width: "50%" }}>Please use chat system  to know number</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: "#aaa", marginBottom: 70 }} />
            </ScrollView>
            <View style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: "#ffd470" }}>
                {dataicon.map((item,index) =>
                    <TouchableOpacity onPress={() => handaldata(item)} >
                        <Entypo name={item.icon} size={s(20)} color="yellow" style={{ marginLeft: 10 }} />
                        <Text >{item.title}</Text>
                    </TouchableOpacity>
                )
                }
            </View>
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

export default ContectView