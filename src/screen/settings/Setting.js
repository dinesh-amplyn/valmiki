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

const Setting = ({ navigation, route }) => {

    const userData = useSelector(state => state.userData)
    const [createevent, setCreateevent] = useState(false)
    const [reportevent, setReportevent] = useState(false)
    const [createnews, setCreatenews] = useState(false)
    const [reportnews, setReportnews] = useState(false)
    const [createannouncement, setcreateannouncement] = useState(false);
    const [reportannouncement, setReportannouncement] = useState(false)
    const [intrestreceived, setIntrestreceived] = useState(false)
    const [chat, setChat] = useState(false);
    const [generatedserver, setGeneratedserver] = useState(false);
    const [admingenerated, setadmingenerated] = useState(false)
    const [isSelected, setIsSelected] = useState([{
        id: 1,
        title: "Create event",
        items: false,
    },
    {
        id: 2,
        title: "report event",
        items: false,
    },
    {
        id: 3,
        title: "create news",
        items: false,
    },
    {
        id: 4,
        title: "report news",
        items: false,
    },
    {
        id: 5,
        title: "Create announcement",
        items: false,
    },
    {
        id: 6,
        title: "report announcement",
        items: false,
    },
    {
        id: 7,
        title: "intrest received",
        items: false,
    },
    {
        id: 8,
        title: "chat",
        items: false,
    },
    {
        id: 9,
        title: "generated server",
        items: false,
    },
    {
        id: 10,
        title: "admin generated",
        items: false,
    },
    ]);
    const updatenews = () => {
        let data = {
            user_id: userData.user.id,
            is_create_event: isSelected[0].items,
            is_report_event:  isSelected[1].items,
            is_create_news:  isSelected[2].items,
            is_report_news:  isSelected[3].items,
            is_create_announcement:  isSelected[4].items,
            is_report_announcement:  isSelected[5].items,
            is_intrest_received:  isSelected[6].items,
            is_chat:  isSelected[7].items,
            is_auto_generated_from_server:  isSelected[8].items,
            is_admin_generated:  isSelected[9].items
        }
        ApisService.update_settings(data)
            .then(response => {

                if (response.status) {
                    // navigation.navigate("AayojanTab")
                    console.log("response::::", response)
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    const handalchange = (index) => {
let newarr=[...isSelected]
newarr[index].items=!newarr[index].items
setIsSelected(newarr)
    }


    return (
      
            <ScrollView style={styles.maincontainer}>

                <View style={styles.containerSwitch}>
                    {isSelected.map((item, index) => (
                        <View style={{flexDirection:"row",padding:15,borderBottomWidth: 1, borderBottomColor: "#ccc", }}>
                             
                            <Text style={{fontSize:18,color:"black",fontWeight:"500"}}>{item.title}</Text>
                            
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={item.items ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => handalchange(index)}
                                value={item.items}
                                style={{marginLeft:"auto"}}

                            />
                            
                        </View>
                   ) )}

                    {console.log("isSelected", isSelected)}
                    <TouchableOpacity onPress={() => updatenews()} style={{ alignSelf: "center", marginTop: 22,marginBottom:20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "500", borderColor: "#fff", borderWidth: 1, paddingHorizontal: 25, paddingVertical: 10, borderRadius: 8, backgroundColor: "#ffd470",color:"#fff" }}>update</Text>
                    </TouchableOpacity>
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
export default Setting