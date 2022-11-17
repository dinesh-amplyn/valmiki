import React, { useState } from "react";
import { ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { s, ms, vs } from "react-native-size-matters";
import SelectDropdown from 'react-native-select-dropdown'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ProfileGoter = (props) => {
    const DATA = ["self", "maa", "Dadi", "Nani"]
    const { goter, setGoter, index } = props

    const handelgoter = (item) => {
        let newgoter = [...goter]
        newgoter[index].gotra_type = item
        setGoter(newgoter)
    }

    return (
        <View style={styles.SelectDropdown}>
            <SelectDropdown
                buttonStyle={{
                    borderRadius: 100, width: "95%", borderWidth: 1,
                    borderRadius: 20,
                    borderColor: '#bbb',
                    backgroundColor: '#ffd470',
                }}

                selectedRowTextStyle={{ color: '#fff' }}
                defaultButtonText="Goter type "
                data={DATA}

                searchPlaceHolder
                defaultValue={goter[index].gotra_type}
                onSelect={(selectedItem, index) => {
                    handelgoter(selectedItem)
                    // console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {

                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {

                    return item
                }}

            />
        </View>
    )
}
const styles = StyleSheet.create({
    SelectDropdown: {
        flexDirection: "row"

    }

})
export default ProfileGoter