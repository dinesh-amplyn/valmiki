import React, { useState } from "react";
import { ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { s, ms, vs } from "react-native-size-matters";
import SelectDropdown from 'react-native-select-dropdown'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const EventType = (props) => {
    const DATA = ["Personal","Business","Social"]
    const {setIndicator,indicator} = props

    return (
        <View style={styles.SelectDropdown}>
        <SelectDropdown
         buttonStyle={{borderRadius:100,width:"100%",  borderWidth: 1,
            borderRadius: 20,
            borderColor:'#bbb',
            backgroundColor: '#ffd470',}}
            selectedRowTextStyle={{color:'#fff'}}
        defaultButtonText=" Select Eventy type"
        data={DATA}
        searchPlaceHolder
        defaultValue={indicator}
        onSelect={(selectedItem, index) => {
            setIndicator(selectedItem)
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
    SelectDropdown:{
       flexDirection:"row"

    }

})
export default EventType