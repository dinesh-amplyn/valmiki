import React, { useState } from "react";
import { ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { s, ms, vs } from "react-native-size-matters";
import SelectDropdown from 'react-native-select-dropdown'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ProfileIncome = (props) => {
    const DATA = ["no income", "3.1 lakh or less", "1 to 3 lack", "3 to 5 lack", " 5 to 10 lack ", "10 to 15 lack", "15 to 20 lack"]
    const incomes = [{
        title: "no income",
        min: 0,
        max: 0,
    },
    {
        title: "3.1 lakh or less",
        min: 0,
        max: 3,
    },
    {
        title: "3 to 5 lack",
        min: 3,
        max: 5,
    },
    {
        title: "5 to 10 lack",
        min: 5,
        max: 10,
    },
    {
        title: "10 to 15 lack",
        min: 10,
        max: 15,
    },
    {
        title: "15 to 20 lack",
        min: 15,
        max: 20,
    },

    ]
    const { setIncomedata, incomedata } = props
    const handaldata=(index)=>{
        setIncomedata(incomes[index])
    }
console.log(incomedata)
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
                defaultButtonText="selecte income"
                data={DATA}

                searchPlaceHolder
                defaultValue={incomedata.title}
                onSelect={(selectedItem, index) => {

                    handaldata(index)
                    console.log(selectedItem, index)
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
export default ProfileIncome