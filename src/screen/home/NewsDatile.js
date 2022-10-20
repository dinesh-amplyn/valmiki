import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, SafeAreaView, View, FlatList, StyleSheet, Text, Alert, Image, Button, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { s } from "react-native-size-matters";
import { useSelector } from "react-redux";
import * as ApisService from "../../providers/apis/apis";
const NewsDatile = ({ route, navigation }) => {
    const userData = useSelector(state => state.userData)
    const [data, setData] = useState({})
    const { value } = route.params
    useEffect(() => {
        dataview()
    }, []);
    const dataview = () => {
        ApisService.newsview(value)
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
    const deletealrt = () => {
        Alert.alert(
            "Confirm!",
            "are you sour delete data?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => deletedata()

                }
            ]
        );
    }
    const deletedata=()=>{
        let data={
            user_id: userData.user.id,
            id:value
        }
        ApisService.newsdelete(data)
            .then(response => {
                console.log('response::::', response)
                if (response.status) {
                    // setData(response.data)
                    console.log("response.data", response.data)
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
            <Text style={styles.inercantainer}>{data.news_type}</Text>
            <Text style={{ color: "black", fontWeight: "700", fontSize: 19, margin: 10 }}>{data.title}</Text>
            <Text style={{ color: "black", fontSize: 17, fontWeight: "500", marginLeft: 40 }}>{data.created_at}</Text>
            <View >
                <Text style={{ color: "black", fontWeight: "500", fontSize: 15, alignItems: "baseline", padding: 10 }}>{data.description}</Text>
                <Text style={{ fontSize: 15, color: "black", margin: 10, fontWeight: "500" }}>Source : {data.author}</Text>
                <View style={{ borderBottomWidth: 1 }} />
                <Text style={{ fontSize: 15, color: "black", margin: 10, fontWeight: "500" }}>posted by : {data.owner_name}</Text>
                <View style={{ borderBottomWidth: 1 }} />
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10,}}>
            {data.user_id == userData.user.id ? <TouchableOpacity onPress={() => navigation.navigate("CreatePost", { values: data })} style={{ marginLeft:"auto",marginRight:20  }}>
                <Text style={{ fontSize: 22, color: "#ffd470", fontWeight: "600" }}>Edit</Text>
            </TouchableOpacity> :
                <TouchableOpacity onPress={() => navigation.navigate("Report", { values: data })} style={{ marginTop: 100, marginLeft: "auto", marginRight: 15 }}>
                    <Text style={{ fontSize: 22, color: "#ffd470", fontWeight: "600" }}>REPORT</Text>
                </TouchableOpacity>}
                {data.user_id == userData.user.id&&<TouchableOpacity onPress={() =>deletealrt()} style={{  }}>
                    <Text style={{ fontSize: 22, color: "#ffd470", fontWeight: "600" }}>Delete</Text>
                </TouchableOpacity>}
                </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    cantainer: {
        flex: 1,
        borderWidth: 0,
        borderRadius: 10,
        width: "95%",
        margin: 10,
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
        borderRadius: s(8),
    }

}
)

export default NewsDatile