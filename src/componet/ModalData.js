import React, { useState } from "react";
import { ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { s, ms, vs } from "react-native-size-matters";

const ModalData = (props) => {
    const [show, setShow] = useState(true)
    const data = [
        {
            id: 1,
            title: "Baby."
        },
        {
            id: 2,
            title: "Master."
        },
        {
            id: 3,
            title: "Miss."
        },
        {
            id: 4,
            title: "Mr."
        },
        {
            id: 5,
            title: "Mrs."
        },
    ]
    const { modalVisible, setModalVisible } = props
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}

        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback>
                        <View style={{ ...styles.modalView, }}>
                            <View style={styles.inercontainer}>
                                <Text style={{ fontSize: 20, color: "white", fontWeight: "600", textAlign: "center" }}>दिव्यगथ का नाम*</Text>
                            </View>
                            {
                                data.map((item) =>
                                    <View style={styles.drawerItem} key={item.id}>
                                        <Text>{item.title}</Text>

                                    </View>
                                )
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    modalView: {
        borderWidth: s(0.5),
        borderColor: 'rgba(213,213,213,0.5)',
        height: '40%',
        backgroundColor: "white",
        width: "60%"
    },
    inercontainer: {
        backgroundColor: "#ffd470",
        height: 45,

    }


})
export default ModalData