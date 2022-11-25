import React, { useEffect, useState, useLayoutEffect } from "react";
import { RefreshControl, ActivityIndicator, SafeAreaView, View, Alert, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Myinformation from "../../screen/contect/Myinformation"
import Past from '../aayojan/Past';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { s } from "react-native-size-matters";
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useSelector } from "react-redux";
import * as ApisService from "../../providers/apis/apis";
import Subscription from "../../componet/Subscription";

const Tab = createMaterialTopTabNavigator();
function Contectlisting({ navigation }) {
    const userData = useSelector(state => state.userData)
const [data,setData]=useState({})
    useLayoutEffect(() => {
        setHeader()
        dataview()
    }, [])


    const setHeader = () => {
        navigation.setOptions({
            title: 'MY ACCOUNT',
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#ffd470'
            },
        })
    }
    const dataview = () => {

        ApisService.contacts_view(userData.user.contact_id)
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
    return (
        <>
            <View style={{ backgroundColor: "#ffd470", height: "40%", marginTop: 10 }}>
                <View style={styles.ImagePickercantainer} >
                    <Image
                        style={styles.imagecontener}
                        source={{ uri:data&&data.image&& data.image.replace("localhost", "192.168.29.196") }} />
                        {console.log("userData.user.image",userData.user.image)}
                </View>
                <Text style={{ fontSize: 26, color: "#fff", fontWeight: "600", textAlign: "center" }}>{data.name}</Text>
                <View style={{ flexDirection:"row",alignItems:"center",justifyContent:"center" }}>
                <Fontisto style={styles.arrowIcon} name={"phone"} size={s(18)} color="#ffd470" />
                <Text style={{ fontSize: 18, fontWeight: "600", color: "white",marginLeft:8 }}>{data.primary_number}</Text>
                <Fontisto style={styles.arrowIcon} name={"email"} size={s(18)} color="#ffd470" />
                <Text style={{ fontSize: 18, fontWeight: "600", color: "white",marginLeft:8 }}>{data.email}</Text>
                </View>
            </View>
            <NavigationContainer independent={true}>
                <Tab.Navigator screenOptions={{
                    tabBarActiveTintColor: "#ffd470",
                    tabBarInactiveTintColor: '#bbb',
                    tabBarLabelStyle: { fontSize: 20 },
                }}>
                    <Tab.Screen name="MY INFORMATION" children={() => <Myinformation navigation={navigation} />} />
                    <Tab.Screen name="SUBSCRIPTIONS" children={() => <Subscription navigation={navigation} />} />
                </Tab.Navigator>
            </NavigationContainer>
            {/* <TouchableOpacity onPress={() => navigation.navigate("AayojanPage")} style={{ position: "absolute", bottom: 30, right: 20 }}>
                <Fontisto style={styles.arrowIcon} name={"plus-a"} size={s(50)} color="white" />
            </TouchableOpacity> */}
        </>

    );
}
const styles = StyleSheet.create({
    arrowIcon: {

        borderRadius: 100,
        backgroundColor: "#fff",
        width:32,
        height:32,
        padding:6,
        marginLeft:20
    },
    imagecontener: {
        width: s(150),
        height: s(150),
        borderRadius: s(100),
        borderWidth: s(4),
        borderColor: "#fff",
    },
    ImagePickercantainer: {
        alignSelf: "center",
        marginTop: s(15)
    },
})
export default Contectlisting