import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { s } from "react-native-size-matters";
import * as ApisService from "../../providers/apis/apis";
import { useSelector } from "react-redux";
import { getCurrentDateTime, formatedDateTime } from "../providers/global/global";
import Fontisto from 'react-native-vector-icons/Fontisto'
import EventData from "../../componet/EventData";
const Upcoming = ({ navigation }) => {
    const userData = useSelector(state => state.userData)
    const [data, setData] = useState()
    const [filter, setFilter] = useState()
    const [searchitem, setSearchitem] = useState()
    const [loader, setLoader] = useState(false);
    const [community, setCommunity] = useState()
    const[image,setImage]=useState()
    useEffect(() => {
        dataList()
    }, []);
    const dataList = () => {
        setLoader(true)
        let data ={
            params:{
                user_id:userData.user.id,
                noimage:image
            }
        }
        ApisService.eventslisting(data)
            .then(response => {
                console.log('response::::', response)
                if (response.status) {
                    setData(response.data)
                    console.log("response.status", response.status)
                    setLoader(false)
                    console.log("response.data", response.data)
                }
            }).catch(error => {
                alert(error.message);
                setLoader(false)
            });
    }
    return (
            < FlatList
                data={data}
                renderItem={({ item }) => (<EventData item={item} data={data}navigation={navigation} />)}
                showsHorizontalScrollIndicator={false}
            />
    )
}

export default Upcoming