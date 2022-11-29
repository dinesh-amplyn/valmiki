import React, { useEffect, useState, useRef } from 'react'
import { Text, View, StyleSheet, Easing, Image, SafeAreaView, TouchableOpacity, Alert, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { color } from 'react-native-reanimated'
import { s, ms } from 'react-native-size-matters'
// import { CSSVariables } from '../theme/variables'
import Fontisto from 'react-native-vector-icons/Fontisto'
// import { colors } from '../theme/colors'

import * as GlobalProviders from '../providers/global/global'
import LoginAuth from '../screen/auth/LoginAuth'
import * as ApisService from '../providers/apis/apis'
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/slices/userSlice"
const drawerData = [
    {
        id: 1,
        icon: "Home",
        title: "home",
    },
    {
        id: 2,
        icon: "My Account",
        title: "male",
    },
    {
        id: 3,
        icon: "संपर्क सूची",
        title: "onenote",
    },
    {
        id: 4,
        icon: "विवाहिकी",
        title: "pulse",
    },
    {
        id: 5,
        icon: "Messages",
        title: "hangout",
    },
    {
        id: 6,
        icon: "Share Feedback",
        title: "share",
    },
    {
        id: 7,
        icon: "Notification",
        title: "bell",
    },
    {
        id: 8,
        icon: "settings",
        title: "sun",
    },
    {
        id: 9,
        icon: "Logout",
        title: "spinner-rotate-forward",
    },
]
const CustomDrawer = ({ navigation }) => {
    const userData = useSelector(state => state.userData)
    const dispatch = useDispatch()
    const GotoTitle = (item) => {
        if (item.title == "home") {
            navigation.navigate('Home')
        }
        if (item.icon == "Logout") {
            logoutAlert()
        }
        if (item.title == "onenote") {
            navigation.navigate('ContectList')

        }
        if (item.title == "pulse") {
            navigation.navigate('profiles')
        }
        if (item.title == "male") {
            navigation.navigate('Contectlisting')
        }
        if (item.title == "share") {
            navigation.navigate('Feedback')
        }
        if (item.title == "sun") {
            navigation.navigate('Setting')
        }
        if (item.title == "bell") {
            navigation.navigate('GetNotification')
        }
    }
    const logoutAlert = () => {
        Alert.alert(
            "Confirm!",
            "You want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => logout()

                }
            ]
        );
    }
    const logout = () => {
        const data = { user_id: userData.user.id, }
        ApisService.logOut(data)
            .then(response => {
                console.log('response::::', response)
                if (response.status) {
                    dispatch(setUserData({}))
                    GlobalProviders.clearStorage();
                    console.log('logout########')
                    navigation.navigate("LoginAuth")
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    return (

        <SafeAreaView style={styles.container}>
            < View style={{ backgroundColor: "rgb(43,47,58)" }}>
                <View style={styles.imagescontainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Contectlisting")}>
                        <Image
                            style={styles.tinyLogo}
                            source={{ uri: userData.user.image.path ?userData.user.image.path : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" }} />


                    </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: "800", color: "#fff",marginTop:10 }}>{ userData.user.name}</Text>
                    </View>
                    
            </View>
            {/* <Text style={{ marginRight:10,borderBottomWidth:1,borderColor:"red",width:"100%"}}></Text> */}
            <View style={{ backgroundColor: "rgb(43,47,58)", position: "absolute", bottom: 0, width: "95%", height: "70%", right: 0, borderTopLeftRadius: s(25) }}>
            <ScrollView  style={{marginBottom:20}}>
              
                {drawerData.map((item, index) =>
                    <View key={item.id}>
                       
                            <TouchableOpacity onPress={() => GotoTitle(item)} style={styles.drawerItem}>
                                <Fontisto style={styles.arrowIcon} name={item.title} size={s(20)} color="yellow" />
                                <Text style={{ fontSize: 18, fontWeight: "600", color: "white", marginLeft: 25 }}>{item.icon}</Text>

                            </TouchableOpacity>

                    </View>
                )
                }
                        </ScrollView>

            </View>
            {/* </ScrollView> */}
        </SafeAreaView >
    )
}

export default CustomDrawer

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "rgb(236,50,105)"

    },
    tinyLogo: {
        width: s(100),
        height: s(100),
        borderRadius: s(100),
        // alignSelf: "center",
        // marginRight: s(100),
        // alignItems: "center",
        // justifyContent: "center",
        marginTop: 30,
        // marginLeft: -20,
        borderWidth: 5,
        borderColor: "#fff"

    },
    imagescontainer: {
        // top: 0,
        // right:0,
        // justifyContent: "center",
        backgroundColor: "rgb(236,50,105)",
        // height: "100%",
        // borderBottomRightRadius: s(25),
        // position: "absolute",
        // width: "100%",
        // backgroundColor:"#fff"
        // justifyContent:"center",
        alignItems:"center"
    },
    drawerItem: {
        flexDirection: "row",
        marginTop: s(25),
        marginLeft: s(18)

    }
})