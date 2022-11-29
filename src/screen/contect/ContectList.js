import React, { useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity, Image, Alert, Dimensions,  TextInput, } from 'react-native';
// import { ScrollView,  } from "react-native-gesture-handler";
import { s } from "react-native-size-matters";
import * as ApisService from "../../providers/apis/apis";
import { useSelector } from "react-redux";
import { getCurrentDateTime, formatedDateTime } from "../../providers/global/global";
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import UserContant from '../../componet/UserContant'
const ContectList = ({ navigation }) => {

    useLayoutEffect(() => {
        setHeader()
    }, [])
    const userData = useSelector(state => state.userData)
    const [data, setData] = useState()
    const [filter, setFilter] = useState()
    const [searchitem, setSearchitem] = useState()
    const [loader, setLoader] = useState(false);
    const [discription, setDiscription] = useState()
    const [isModalVisible, setModalVisible] = useState(false);

    // const[image,setImage]=useState()

    useEffect(() => {
        dataList()
    }, [searchitem]);
    const dataList = () => {
        setLoader(true)
        let data = {
            params: {
                search: searchitem,
                user_id: userData.user.id,
                // image:image
            }
        }
        ApisService.contactslisting(data)

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
    
    const openDrawer = () => {
        navigation.openDrawer()
    }
    const setHeader = () => {
        navigation.setOptions({
            title: 'संपर्क सूची ',
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
                <TouchableOpacity style={{ marginRight: 15 }} onPress={() =>setModalVisible(true)}>
                    <Ionicons name="md-information-circle-outline" size={s(22)} color="#fff" />
                </TouchableOpacity>
            ),
        })
    }
    const Source = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("ContectView", { value: item.id })} style={styles.newscontainer}>
                <Image
                    style={styles.imagecontener}
                    source={{ uri:item.image.replace("localhost", "192.168.29.196") }} />
                {console.log("item.image.path+++++++++++++++++++++++++++++++++++++++",item.image)}

                <View style={{ marginLeft: 20, marginTop: 10 }}>
                    <Text style={{ color: "#fff", fontWeight: "600", fontSize: 18 }}>{item.name}</Text>
                    <Text style={{ fontSize: 18, color: "#fff" }}>|  {item.contact_unique_id}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: "#ffd470" }}>
                <View style={styles.inercontainer}>
                    <Ionicons name="search" size={s(25)} color='black' style={{marginLeft:7}}/>
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
                <UserContant isModalVisible={isModalVisible} setModalVisible={setModalVisible}navigation={navigation} />

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
        flexDirection: "row",
        marginLeft: 24,
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
        height: 140,
        flexDirection: "row",
        margin: 10,
        backgroundColor: "#ffd470",
        marginTop: 15,
        shadowOffset: {
            width: 20,
            height: -5
        },
        shadowOpacity: -20,
        shadowRadius: 40,
        shadowColor: "black",
        elevation: 2
    },
    imagecontener: {
        width: 90,
        height: 95,
        borderRadius: s(100),
        marginTop: 10
    },
    inputcontainer: {
        // borderWidth: 1,
        // borderColor: "#fff",
        // backgroundColor: "#fff",
        width: "90%",
        alignItems: "center",
        fontWeight: "500",
        fontSize: 17,
        borderRadius:10,
        color:"black"
    
    },
    orderDetailsText: {
        fontWeight: "600",
        color: "black",
        backgroundColor: "#ffd470",
        borderWidth: 0,
        margin: 10,
        borderRadius: 2,
        paddingVertical: 5,
        paddingHorizontal: 5
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
export default ContectList