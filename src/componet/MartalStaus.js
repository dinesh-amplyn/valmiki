import React, { useState, useEffect } from "react";
import { ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { s, ms, vs } from "react-native-size-matters";
import SelectDropdown from 'react-native-select-dropdown'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const MartalStaus = (props) => {
    // const DATA = ["Never Married","Divorce","Awiating Diveorced", "Wiowed","Annulled"]
    const { marital, setMarital, data } = props
    const [marrise, setMarrise] = useState([])

    useEffect(() => {
        handaldata()
    }, [])
    // console.log("data", data)

    const handaldata = () => {
        let newarr = []
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                newarr.push(data[key])
            }
        }
        // console.log("newarr", newarr)
        setMarrise(newarr)
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
                defaultButtonText="selecte Marrital Status"
                data={marrise}

                searchPlaceHolder
                defaultValue={marital}
                onSelect={(selectedItem, index) => {
                    setMarital(selectedItem)
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
export default MartalStaus