import React, { useEffect, useState, useLayoutEffect, useRef, useCallback } from "react";
import { RefreshControl, ActivityIndicator, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { s } from "react-native-size-matters";
import * as ApisService from "../../providers/apis/apis";
import { useSelector } from "react-redux";
import { getCurrentDateTime, formatedDateTime } from "../../providers/global/global";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDrawerStatus } from '@react-navigation/drawer';
import BottomTab from "../../navigation/BottomTab";
import ContectModal from "../../componet/ContectModal";
const Home = ({ navigation }) => {
    const userData = useSelector(state => state.userData)
    const isDrawerOpen = useDrawerStatus()
    const [discription, setDiscription] = useState()
    const [pages, setPages] = useState()
    const [data, setData] = useState()
    const [loader, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [showData, setShowData] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false)
    const flatlistRef = useRef();
    useEffect(() => {
        setModalVisible(true)
    }, [])

    useEffect(() => {
        dataList()
    }, [showData]);
    const openDrawer = () => {
        navigation.openDrawer()
    }
    useEffect(() => {
        console.log("isDrawerOpen::::::::::::::::::", isDrawerOpen)
    }, [isDrawerOpen]);
    useEffect(() => {
        console.log("userData::::::::::::::::::", userData)
        if (userData && userData.user.contact_id) {

            setModalVisible(false)
        }
        else {
            setModalVisible(true)

        }
        navigation.addListener('focus', () => {
            if (userData && userData.user.contact_id) {

                setModalVisible(false)
            }
            else {
                setModalVisible(true)

            }
        })
    }, []);

    const dataList = () => {
        setLoader(true)
        ApisService.feedHistory(userData.user.id, pages)
            .then(response => {
                console.log('response::::', response)
                if (response.status) {
                    setData(response.data)
                    setLoader(false)
                    console.log("response.data", response.data)
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
        // console.log("data", data)
        ApisService.sharepost(data)
            .then(response => {
                // console.log("response::::", response)
                setDiscription(null)
                flatlistRef.current.clear()
                if (response.status) {
                    setShowData(!showData)
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
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate("ContectList")} >
                        <Ionicons name="ios-people" size={s(22)} color="#fff" />
                    </TouchableOpacity >
                    <TouchableOpacity style={{ marginRight: 15 }}>
                        <Ionicons name="md-information-circle-outline" size={s(22)} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 15 }}>
                        <Ionicons name="md-paper-plane" size={s(22)} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={()=>navigation.navigate("GetNotification")}>
                        <Ionicons name="md-notifications-sharp" size={s(22)} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate("Contectlisting")}>
                        <Image
                            style={styles.imagecontener}
                            source={{ uri: userData.user && userData.user.image && userData.user.image.replace("localhost", "192.168.29.196") }} />

                    </TouchableOpacity>
                </View>
            ),
        })
    }
    const handaldateil = (item, data) => {
        if (item.type == "news") {
            navigation.navigate("NewsDatile", { value: item.id})
            console.log("*************************")
        }
        if (item.type == "event") {
            navigation.navigate("EventDatile", { value: item})
            console.log("*************************")
        }
        if (item.type == "announcement") {
            navigation.navigate("AllDetail", { value: item.id})
            console.log("*************************")
        }
    }
    const Source = ({ item, data }) => {
        return (
            <ScrollView style={styles.maincontainer}>

                {item.type == "post" ? <View style={styles.maininercontainer}>
                    <View style={{ flexDirection: "row" }}>

                        <Image
                            style={{ width: 50, height: 50, borderRadius: 100, margin: 10 }}
                            source={{ uri: item.image.replace("localhost", "192.168.29.196") }} />
                        <View style={{ alignSelf: "baseline", margin: 15 }}>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: "#ffd470" }}>{item.title}</Text>
                            <Text style={{ color: "#ffd470", fontWeight: "600", fontSize: 15 }}>posted on {formatedDateTime(item.created_at, 'DD/MM YYYY')}</Text>

                        </View>
                    </View>
                    <Text style={{ color: "#ffd470", fontWeight: "500", fontSize: 15, marginLeft: 20, marginBottom: 30, width: 70 }}>{item.description}</Text>

                </View>
                    :
                    <TouchableWithoutFeedback style={styles.maininercontainer} onPress={() => handaldateil(item, data)} >

                        <Image
                            style={{ width: 370, height: 200, borderTopLeftRadius: 12, borderTopRightRadius: 12, }}
                            source={{ uri: item.image.replace("localhost", "192.168.29.196") }} />
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 18, width: "15%", height: 50, backgroundColor: "#ffd470", marginLeft: 10, borderRadius: 8, textAlign: "center" }}>{formatedDateTime(item.created_at, 'DD/MM YYYY')}</Text>
                            <Text style={{ color: "#ffd470", fontWeight: "400", fontSize: 20, width: "60%", marginLeft: 15 }}>{item.description}</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", margin: 10 }} />
                        <Text style={{ borderWidth: 0, color: "#ffd470", fontSize: 20, marginLeft: 15, marginBottom: 10 }}>{item.event_type}</Text>
                    </TouchableWithoutFeedback>}
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
                renderItem={({ item }) => (<Source item={item} data={data} />)}
            // showsHorizontalScrollIndicator={false}
            />
            <View style={{ position: "absolute", width: "100%", bottom: 10 }}>
                <BottomTab navigation={navigation} />
            </View>
            <ContectModal setModalVisible={setModalVisible} isModalVisible={isModalVisible} />
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
        // alignSelf: "baseline",
        textAlign: "center",

        // borderBottomRightRadius:

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