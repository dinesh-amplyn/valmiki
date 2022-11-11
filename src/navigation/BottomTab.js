import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { s } from "react-native-size-matters";
const BottomTab = ({navigation}) => {
    const DATA = [
        {
            id: 1,
            title: "विवाहिकी |",
            screnn:"profiles"
        },
        {
            id: 2,
            title: "आयोजन",
            screnn:"AayojanTab"
    
        },
        {
            id: 3,
            icon: "home",
            screnn:"Home"
        },
        {
            id: 4,
            title: "श्रद्धांजलि |",
            screnn:"TopTab"
    
        },
        {
            id: 5,
            title: "समाचार",
            screnn:"UserNews"
    
        }
    ]
    const GotoTitle = (item) => {
            navigation.navigate(item.screnn)
    }
    return (
        <View style={styles.mapcontainer}>
            {DATA.map((item) =>
                <TouchableOpacity onPress={()=>GotoTitle(item)} style={styles.drawerItem} key={item.id}>
                        <Fontisto name={item.icon} size={s(20)} color="yellow" />
                    <Text style={{ fontSize: 15, fontWeight: "500", color: "#fff", alignSelf: "center", position: "absolute", top: 5 }}>{item.title}</Text>
                </TouchableOpacity>
            )
            }
        </View>
    );
}
const styles = StyleSheet.create({
    mapcontainer: {

        flexDirection: "row",
        backgroundColor: "#ffd470",
        justifyContent: "space-evenly",
        margin: 8,
        padding: 8,
    },
    arrowIcon: {
        alignItems: "center",
        alignSelf: "center",
    }
})
export default BottomTab