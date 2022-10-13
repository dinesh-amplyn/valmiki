import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput, } from 'react-native';
import { s } from "react-native-size-matters";
const EventData = ({ item, navigation }) => (
    <TouchableOpacity onPress={() => navigation.navigate("EventDatile", { EventData: item.id })} style={styles.newscontainer} >
        <Image
            style={styles.imagecontener}
            source={{ uri:  item.image.replace("localhost", "192.168.29.196") }} />
        <View style={{ flexDirection: "row" }}>
            <Text style={styles.orderDetailsText}>{item.created_at}</Text>
            <View>
                <Text style={{ color: "black", fontWeight: "600", fontSize: 20, alignSelf: "baseline", width: 280, marginLeft: 10 }}>{item.title}</Text>
                <Text style={{ color: "black", fontWeight: "500", fontSize: 15, marginLeft: 20, marginTop: 10 }}>{item.address}</Text>
            </View>
        </View>
        <Text style={{ borderBottomWidth: 1 }} ></Text>
        <Text style={{ color: "#aaa", fontWeight: "500", fontSize: 15, alignItems: "baseline", padding: 10 }}>{item.event_type}</Text>
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
        width: "95%",
        height: 220,
        borderRadius: s(8),
        margin: 10
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
        height: 35
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
export default EventData