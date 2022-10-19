import React, { useState, useEffect } from "react";
import { ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { s, ms, vs } from "react-native-size-matters";
import { useSelector } from "react-redux";
import * as ApisService from "../providers/apis/apis";
import Fontisto from 'react-native-vector-icons/Fontisto';

const EventMulti = (props) => {
    const userData = useSelector(state => state.userData)
    const { handeldata, selectdata, setModalVisible, isModalVisible, setIsSelected } = props
    const [data, setData] = useState({})
    useEffect(() => {
        dataList()
    }, []);
    const dataList = () => {
        let data = {
            user_id: userData.user.id,
        }

        ApisService.userslisting(data)
            .then(response => {
                // console.log('response::::', response)
                if (response.status) {
                    setData(response.data)

                }
            }).catch(error => {
                alert(error.message);
            });
    }
    // const dataset=()=>{
    //     if(selectdata(false)){
    //         setModalVisible(false);
    //     }
    // }
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
                            < FlatList
                                data={data}
                                renderItem={({ item }) => {
                                    let index = selectdata.findIndex(p => p == item.name)
                                    return (
                                        <TouchableOpacity onPress={() => handeldata(item.name)} style={{ flexDirection: "row", borderWidth: 1, justifyContent: "space-between" }}>
                                            <Fontisto name="radio-btn-active" size={20} color={`${index != -1 ? "yellow" : "#aaa"}`} />
                                            <Text style={{ fontSize: 20 }}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                }
                            />
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginLeft: "auto", marginRight: 10, fontSize: 18, fontWeight: "bold", padding: 5, borderWidth: 1, borderColor: "yellow", color: "yellow", backgroundColor: "#bbb" }} onPress={() => setModalVisible(false)}>ok</Text>
                                {/* <Text style={{ marginLeft: "auto", marginRight: 10, fontSize: 18, fontWeight: "bold", padding: 5,borderWidth:1 ,borderColor:"yellow",color:"yellow",backgroundColor:"#bbb"}} onPress={() => dataset()}>cancal</Text> */}
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
        height: '40%',
        width: "60%",
        backgroundColor: "#fff"

    },

})
export default EventMulti