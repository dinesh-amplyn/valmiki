import React, { useEffect, useState, useLayoutEffect } from "react";
import { RefreshControl, ActivityIndicator, SafeAreaView, View, Alert, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Upcoming from '../toptabs/Upcoming';
import Past from '../toptabs/Past';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { s } from "react-native-size-matters";
import Fontisto from 'react-native-vector-icons/Fontisto'
const Tab = createMaterialTopTabNavigator();
function TopTab({ navigation }) {
    useLayoutEffect(() => {
        setHeader()
    }, [])
    const logoutAlert = () => {
        Alert.alert(
            "इस section में आप श्रद्धांजलि कार्यक्रम की सूचना समाज में परसित कर सकते हैं ",
            " ",
            [
                {
                    text: " ",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => console.log("oky Pressed"),

                }
            ]
        );
    }
    const openDrawer = () => {
        navigation.openDrawer()
    }
    const setHeader = () => {
        navigation.setOptions({
            title: ' ',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#ffd470'
            },
            headerLeft: () => (
                <View>
                    <TouchableOpacity style={styles.headerLeft} onPress={() => openDrawer()}>
                        <Ionicons name="ios-reorder-three-sharp" size={s(32)} color='#fff' />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }} onPress={() => logoutAlert()}>
                    <Ionicons name="md-information-circle-outline" size={s(22)} color="#fff" />
                </TouchableOpacity>
            ),
        })
    }
    return (<>
        <NavigationContainer independent={true}>
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: "#3CD08E",
                tabBarInactiveTintColor: '#bbb',
                tabBarLabelStyle: { fontSize: 20 },
            }}>
                <Tab.Screen name="Upcoming" children={()=><Upcoming navigation={navigation}/>}/>
                <Tab.Screen name="Past" children={()=><Past navigation={navigation}/>} />
            </Tab.Navigator>
        </NavigationContainer>
        <TouchableOpacity onPress={() => navigation.navigate("DetailPage")} style={{ position: "absolute", bottom: 10, right: 20 }}>
            <Fontisto style={styles.arrowIcon} name={"plus-a"} size={s(50)} color="white" />
        </TouchableOpacity>
    </>
    );
}
const styles = StyleSheet.create({
    arrowIcon: {

        borderRadius: 100,
        backgroundColor: "#ffd470",
    }
})
export default TopTab