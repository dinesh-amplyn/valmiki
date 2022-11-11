import React, { useState, useEffect } from "react";
import { ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { s, ms, vs } from "react-native-size-matters";
import { useSelector } from "react-redux";
import * as ApisService from "../providers/apis/apis";
import Fontisto from 'react-native-vector-icons/Fontisto';

const EventMulti = (props) => {
    const userData = useSelector(state => state.userData)
    const { handeldata, selectdata, setModalVisible, isModalVisible, setIsSelected,navigation } = props
    const [data, setData] = useState({})

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
                setModalVisible(isModalVisible);
            }}
        >
                   <TouchableWithoutFeedback onPress={() => setModalVisible(!isModalVisible)}>
                <View style={styles.centeredView} onPress={() => setModalVisible(!isModalVisible)}>
                    <TouchableWithoutFeedback>
                        <View style={{
                            ...styles.modalView
                        }}>
                            <Text style={{fontSize:17,textAlign:"center"}}>यह सूची वाल्मीकि समाज के नागरिको की जानकारी प्रदान करती है . यहाँ आप अपनी इच्छानुसार अपनी जानकारी समाज से साझां कर सकते है ताकि समाज से संवाद बढ़ सके । सभी से निवेदन है कि सुचनाओ का सदुपयोग करे ।</Text>
                            <TouchableOpacity onPress={() =>navigation.navigate("FaqFile")}>
                                <Text style={{fontSize:16,color:"#ffd470",borderWidth:1,borderColor:"#ffd470",marginTop:20,width:"90%",marginLeft:10,textAlign:"center"}}> अधिक जानकारी के लिए यहाँ क्लिक करे</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginLeft: "auto", marginRight: 10, fontSize: 18, fontWeight: "bold", padding: 5, borderWidth: 1, borderColor: "#ffd470", color: "#ffd470" ,marginTop:5}} onPress={() => setModalVisible(false)}>ok</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
const styles = StyleSheet.create({
    SelectDropdown: {
        backgroundColor: "red"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        borderWidth: s(0.5),
        borderColor: 'rgba(213,213,213,0.5)',
        height: '30%',
        width: "70%",
        backgroundColor: "#fff"

    },

})
export default EventMulti