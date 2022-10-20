import React from "react";
import { View,  StyleSheet, Text,  Image, TouchableOpacity, ImageBackground, } from 'react-native';
import { s } from "react-native-size-matters";
import img from '../../assest/photo-frame.png'
const RenderData = ({ item, navigation }) => (
    <TouchableOpacity onPress={() => navigation.navigate("AllDetail", { Announcedata:item.id })} style={styles.newscontainer} >
          <ImageBackground source={img } style={{  height: 200 }}>
            <View style={styles.titles}>
                <Image
            style={styles.imagecontener}
            source={{ uri: item.image.replace("localhost", "192.168.29.196") }}
            />
            </View>
        </ImageBackground>
        <View style={{ flexDirection: "row" }}>
            <Text style={styles.orderDetailsText}>{item.event_datetime}</Text>
            <View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "black", fontWeight: "500", fontSize: 15, marginLeft: 10, textAlign: "center" }}>{item.name_indicator}</Text>
                    <Text style={{ color: "black", fontWeight: "500", fontSize: 15, marginLeft: 10 }}>{item.name}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "black", fontWeight: "500", fontSize: 15, marginLeft: 10 }}>{item.event_place}</Text>
                    <Text style={{ color: "black", fontWeight: "500", fontSize: 15, marginLeft: 10 }}>{item.native_village}</Text>
                </View>
            </View>
        </View>
        <View style={{ borderBottomWidth: 1, color: "red" }} />
        <Text style={{ color: "#ffd470", fontWeight: "500", fontSize: 15, alignItems: "baseline", padding: 10 }}>{item.event_name}</Text>
    </TouchableOpacity>
)
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inercontainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: s(10)
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
        borderWidth: 0,
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
        width: s(153),
        height: s(149),
        borderRadius: s(100),
        // margin: 10,
        alignSelf:"center",
        marginTop:5,
        marginRight:5
    },
    inputcontainer: {
        borderWidth: 0,
        borderRadius: 8,
        backgroundColor: "#fff",
        width: "70%",
    },
    orderDetailsText: {
        fontWeight: "600",
        color: "black",
        backgroundColor: "#ffd470",
        borderWidth: 0,
        width: "20%",
        textAlign: "center",
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
export default RenderData