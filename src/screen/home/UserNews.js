import React, { useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Alert, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { s } from "react-native-size-matters";
import * as ApisService from "../../providers/apis/apis";
import { useSelector } from "react-redux";
import { getCurrentDateTime, formatedDateTime } from "../../providers/global/global";
import Fontisto from 'react-native-vector-icons/Fontisto'
import { SearchBar } from "react-native-screens";
import Ionicons from 'react-native-vector-icons/Ionicons'

const UserNews = ({ navigation }) => {
    useLayoutEffect(() => {
        setHeader()
    }, [])
    const userData = useSelector(state => state.userData)
    const [data, setData] = useState()
    const [filter, setFilter] = useState()
    const [searchitem, setSearchitem] = useState()
    const [loader, setLoader] = useState(false);
    const [discription, setDiscription] = useState()
    

    useEffect(() => {
        dataList()
    }, [searchitem]);
    const dataList = () => {
        setLoader(true)
        let data = {
            params: {
                search: searchitem,

            }
        }
        ApisService.listing(data)

            .then(response => {
                console.log('response::::', response)
                if (response.status) {
                    setData(response.data)
                    console.log("response.status", response.status)

                    setLoader(false)
                    // setFilter(response.data)
                    console.log("response.data", response.data)
                }
            }).catch(error => {
                alert(error.message);
                setLoader(false)

            });
    }
    const logoutAlert = () => {
        Alert.alert(

            "इस section में आप समाचार/ विचार कार्यक्रम की सूचना समाज में परसित कर सकते हैं ",
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
            title: 'समाचार/ विचार ',
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#ffd470',
            
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
    const Source = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("NewsDatile", { value: item.id })} style={styles.newscontainer}>
                <Image
                    style={styles.imagecontener}
                    source={{ uri: item.image.replace("localhost", "192.168.29.196") }} />
                    {console.log(item.image)}
                <Text style={{ borderWidth: 0, backgroundColor: "#ffd470", fontSize: 18, width: 50, borderRadius: 8, textAlign: "center", position: "absolute", left: 5, top: 5 }}>{item.news_type}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.orderDetailsText}>{formatedDateTime(item.created_at, 'DD/MM/YYYY')}</Text>
                    <Text style={{ color: "black", fontWeight: "600", fontSize: 18,marginTop:10 }}>{item.title}</Text>
                </View>
                <Text style={{ color: "black", fontWeight: "500", fontSize: 15, alignItems: "baseline", padding: 10 }}>{item.description.substring(0, 288)}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{backgroundColor:"#ffd470"}}>
            <View style={styles.inercontainer}>
            <Ionicons name="search" size={s(25)} color='black' style={{marginLeft:7}} />
                < TextInput
                    style={styles.inputcontainer}
                    autoCapitalize="none"
                    multiline={true}
                    onChangeText={(e) => setSearchitem(e)}
                    placeholderTextColor="black"
                    placeholder="Search Contact"
                />
                </View>
            </View>
            < FlatList
                data={data}
                renderItem={({ item }) => (<Source item={item} data={data} />)}
                showsHorizontalScrollIndicator={false}
            />
            <TouchableOpacity onPress={() => navigation.navigate("CreatePost")} style={{ position: "absolute", bottom: 35, right: 30 }}>
                <Fontisto style={styles.arrowIcon} name={"plus-a"} size={s(50)} color="white" />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inercontainer: {
        marginTop: s(10),
        borderWidth: 1,
        borderColor: "#aaa",
        backgroundColor: "#fff",
        width: "90%",
        alignItems: "center",
        fontWeight: "600",
        fontSize: 17,
        flexDirection:"row",
        marginLeft:23,
        borderRadius:20,
        marginBottom:5
    },
    textcontainer: {
        marginTop: s(10),
        borderWidth: 0,
        backgroundColor: "#eee",
        borderRadius: s(8),
        paddingHorizontal: s(40),
        paddingVertical: s(8),
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
    maincontainer: {
    },
    newscontainer: {
        borderWidth: 2,
        borderColor: "#ffd470",
        borderRadius: 10,
        width: "95%",
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
    imagecontener: {
        width: "100%",
        height: 220,
        borderRadius: s(8),
    },
    inputcontainer: {
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "#fff",
        width: "90%",
        alignItems: "center",
        fontWeight: "600",
        fontSize: 17,
        borderRadius:10,
        color:"black"

    },
    orderDetailsText: {
        fontWeight: "600",
        color: "black",
        backgroundColor: "#ffd470",
        borderWidth: 0,
        margin:10,
        borderRadius:2,
        paddingVertical:5,
        paddingHorizontal:5
    },
    drawerItem: {
        flexDirection: "row",
        backgroundColor: "#ffd470"
    },
    arrowIcon: {

        borderRadius: 100,
        backgroundColor: "#ffd470",
    }
}
)
export default UserNews