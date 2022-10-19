import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { RefreshControl, ActivityIndicator, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { s } from "react-native-size-matters";
import * as ApisService from "../../providers/apis/apis";
import { useSelector } from "react-redux";
import { getCurrentDateTime, formatedDateTime } from "../../providers/global/global";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDrawerStatus } from '@react-navigation/drawer';
import BottomTab from "../../navigation/BottomTab";
const Home = ({ navigation }) => {
    const userData = useSelector(state => state.userData)
    const isDrawerOpen = useDrawerStatus()
    const [discription, setDiscription] = useState()
    const [pages, setPages] = useState()
    const [data, setData] = useState()
    const [loader, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showData, setShowData] = useState(false);
    const flatlistRef = useRef();

    useEffect(() => {
        dataList()
    }, [showData]);
    const openDrawer = () => {
        navigation.openDrawer()
    }
    useEffect(() => {
        console.log("isDrawerOpen::::::::::::::::::", isDrawerOpen)
    }, [isDrawerOpen]);
    const dataList = () => {
        setLoader(true)
        ApisService.feedHistory(userData.user.id, pages)
            .then(response => {
                // console.log('response::::', response)
                if (response.status) {
                    setData(response.data)
                    setLoader(false)
                    // console.log("response.data", response.data)
                }
            }).catch(error => {
                alert(error.message);
                setLoader(false)
            });
    }
    const onRefresh = () => {
        dataList();
    }
    const postnews = () => {
        let data = {
            user_id: userData.user.id,
            description: discription,
        }
        setLoader(true)
        // console.log("data", data)
        ApisService.sharepost(data)
            .then(response => {
                // console.log("response::::", response)
                setDiscription(null)
                flatlistRef.current.clear()
                if (response.status) {
                    setTimeout(() => {
                        setLoader(false)
                        setShowData(!showData)
                    }, 1000);
                }
            }).catch(error => {
                alert(error.message);
                setLoader(false)
            });
    }
    useLayoutEffect(() => {
        setHeader()
    }, [])

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
                <View style={styles.headerRight} >
                    <TouchableOpacity style={{ marginRight: 15 }} >
                        <Ionicons name="ios-people" size={s(22)} color="#fff" />
                    </TouchableOpacity >
                    <TouchableOpacity style={{ marginRight: 15 }}>
                        <Ionicons name="md-information-circle-outline" size={s(22)} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 15 }}>
                        <Ionicons name="md-paper-plane" size={s(22)} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 15 }}>
                        <Ionicons name="md-notifications-sharp" size={s(22)} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 15 }}>
                        <Image
                            style={styles.imagecontener}
                            source={{ uri: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png" }} />
                    </TouchableOpacity>
                </View>
            ),
        })
    }
    const Source = ({ item }) => {
        return (
            <ScrollView style={styles.maincontainer}>
                <View style={styles.maininercontainer}>
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        source={{ uri: item.image.replace("localhost", "192.168.29.196") }} />
                    <Text>{item.title}</Text>
                    <Text style={styles.orderDetailsText}>{item.created_at}</Text>
                    <Text style={{ color: "#ffd470", fontWeight: "500", fontSize: 15, alignItems: "baseline", padding: 10 }}>{item.description}</Text>
                    <Text style={{ borderWidth: 0, color: "red", fontSize: 20 }}>{item.event_type}</Text>
                </View>
            </ScrollView>
        )
    }
    return (
        <View style={styles.container}
        >
            {loader && <ActivityIndicator size="large" color="#00ff00" />
            }

            < FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => onRefresh()}
                    />}
                ListHeaderComponent={<View style={styles.inercontainer}>
                    < TextInput
                        style={styles.inputcontainer}
                        placeholder="अपना संदेश लिखे और पोस्ट करे."
                        autoCapitalize="none"
                        multiline={true}
                        onChangeText={(numeric) => setDiscription(numeric)}
                        placeholderTextColor="black"
                        ref={flatlistRef}

                    // maxLength={5000}
                    />
                    <TouchableOpacity onPress={() => postnews()}>
                        <Text style={styles.textcontainer1}>post</Text>
                    </TouchableOpacity>
                </View>}
                data={data}
                renderItem={({ item }) => (<Source item={item} />)}
            // showsHorizontalScrollIndicator={false}
            />
            <View style={{ position: "absolute", width: "100%", bottom: 10 }}>
                <BottomTab navigation={navigation} />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        borderWidth: 0,
        // width:s(50)
    },
    inercontainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: s(10),
        // marginLeft: 40
    },
    newscontainer: {
        borderWidth: 0,
        borderRadius: s(10),
        // width: "95%",
        margin: s(10),
        backgroundColor: "#fff",
        shadowOffset: {
            width: 10,
            height: -5
        },
        shadowOpacity: 5,
        shadowRadius: 20,
        shadowColor: "black",
        elevation: 5
    },
    inputcontainer: {
        borderWidth: 0,
        width: "80%",
        borderRadius: 8,
        backgroundColor: "#fff",
        height: 50
    },

    maincontainer: {
        borderWidth: 0,
        borderRadius: 10,
        margin: 10,
        backgroundColor: "#fff",
        shadowOffset: {
            width: 10,
            height: -5
        },
        shadowOpacity: 5,
        shadowRadius: 20,
        shadowColor: "black",
        elevation: 5
    },
    maininercontainer: {
        justifyContent: "center",
        alignSelf: "baseline",
        textAlign: "center"
    },
    textcontainer1: {
        fontWeight: "500",
        alignItems: "center",
        alignSelf: "center",
        borderWidth: 0,
        backgroundColor: "#ffd470",
        borderRadius: s(100),
        paddingHorizontal: s(5),
        paddingVertical: s(8),
        marginTop: s(6),
        color: "white"
    },
    headerRight: {
        flexDirection: "row",
    },
    imagecontener: {
        width: s(24),
        height: s(24),
        borderRadius: s(100),
        backgroundColor: "#fff"
    }
}
)
export default Home