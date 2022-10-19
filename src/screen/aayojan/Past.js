import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { s } from "react-native-size-matters";
import * as ApisService from "../../providers/apis/apis";
import { useSelector } from "react-redux";
import EventData from "../../componet/EventData";
const Past = ({ navigation }) => {
    const userData = useSelector(state => state.userData)
    const [data, setData] = useState()
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        dataList()
    }, []);
    const dataList = () => {
        let data = {
            params: {
                user_id:userData.user.id,
                type:'past'
            }
        }
        ApisService.eventslisting(data)
            .then(response => {
                console.log('response::::', response)
                if (response.status) {
                    setData(response.data)
                    console.log("response.status", response.status)
                    console.log("response.data", response.data)
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    return (
            < FlatList
                data={data}
                renderItem={({ item }) => (<EventData item={item} navigation={navigation}/>)}
                showsHorizontalScrollIndicator={false}
            />
    )
}

export default Past