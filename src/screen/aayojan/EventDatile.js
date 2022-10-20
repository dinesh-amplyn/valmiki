import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { s } from "react-native-size-matters";
import { useSelector } from "react-redux";
import * as ApisService from "../../providers/apis/apis";
const EventDatile = ({ route, navigation }) => {
    const userData = useSelector(state => state.userData)
    const [data, setData] = useState({})
    const { EventData,type } = route.params

    useEffect(() => {
        dataview()
    }, []);
    const dataview = () => {
        ApisService.eventsdetails(EventData)
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
    const deletedata = () => {
        let data = {
            user_id: userData.user.id,
            id: EventData
        }
        ApisService.eventsdelete(data)
            .then(response => {
                console.log('response::::', response)
                if (response.status) {
                    alert("are you sure delete data")
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
                
            <View style={{ margin: 15 }}>
                <Text style={{ fontSize: 25, color: "black" }}>{data.title}</Text>
                <Text style={styles.inercantainer}>{data.start_date_time}</Text>
                <Text style={styles.inercantainer}> {data.address}</Text>
                <Text style={{ fontSize: 15, color: "black", marginTop: 12, fontWeight: "500", }}>{data.description}</Text>
                <Text style={{ fontSize: 15, color: "black", marginTop: 12, fontWeight: "500", marginBottom: 15 }}>Posted by: {data.owner_name}</Text>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <>
                    {console.log("userData.user.id",userData.user.id)}
                    {console.log("data.user_id ",data.user_id )}
                    {console.log("type==",type )}
                     {(data.user_id == userData.user.id) &&type=="upcoming" &&<TouchableOpacity onPress={() => navigation.navigate("AayojanPage", { values: data })} style={{ marginLeft: "auto", marginRight: 15, borderWidth: 0, backgroundColor: "#ffd470", borderRadius: 10, padding: 5 }}>
                <Text style={{ fontSize: 22, color: "#fff", fontWeight: "600" }}>Edit</Text>
            </TouchableOpacity> }
                {data.user_id !== userData.user.id&&<TouchableOpacity onPress={() => navigation.navigate("Report", { values: data })} style={{ marginLeft: "auto", marginRight: 15, borderWidth: 0, backgroundColor: "#ffd470", borderRadius: 10, padding: 5 }}>
                    <Text style={{ fontSize: 22, color: "#fff", fontWeight: "600" }}>REPORT</Text>
                </TouchableOpacity>}
                {(data.user_id == userData.user.id) &&type=="upcoming" &&<TouchableOpacity onPress={() =>deletedata()} style={{  marginLeft: "auto", marginRight: 15, borderWidth: 0, backgroundColor: "#ffd470", borderRadius: 10, padding: 5 }}>
                    <Text style={{ fontSize: 22, color: "#fff", fontWeight: "600" }}>Delete</Text>
                </TouchableOpacity>}
                </>
                </View>
                <View style={{ borderBottomWidth: 1 }} />
                <Text style={{ fontSize: 20, color: "#aaa", fontWeight: "bold" }}>{data.event_type}</Text>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    cantainer: {
        flex: 1,
    },
    inercantainer: {
        fontSize: 18, color: "black", marginTop: 12, fontWeight: "500", marginLeft: 15
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
    // maincantainer: {
    //     borderWidth: 2,
    //     borderColor: "#fff",
    //     borderRadius: 10,
    //     width: "95%",
    //     margin: 10,
    //     backgroundColor: "#fff",
    //     shadowOffset: {
    //         width: 10,
    //         height: -5
    //     },
    //     shadowOpacity: 5,
    //     shadowRadius: 20,
    //     shadowColor: "black",
    //     elevation: 5

    // }

}
)

export default EventDatile