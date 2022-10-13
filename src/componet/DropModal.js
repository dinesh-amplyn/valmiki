import React, { useState } from "react";
import { ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { s, ms, vs } from "react-native-size-matters";
import SelectDropdown from 'react-native-select-dropdown'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const DropModal = (props) => {
    const DATA = ["निधन", "शोक सभा", "उठावना", "पुण्यतिथि","अन्य शोक दिवस"]
    const { eventName, setEventName } = props

    return (
        <View style={styles.SelectDropdown}>
        <SelectDropdown
         buttonStyle={{borderRadius:100,  borderWidth: 1,width:"100%",
            borderRadius: 20,
            borderColor:'#bbb',
            backgroundColor: '#eee',}}
            selectedRowTextStyle={{color:'#fff'}}
        defaultButtonText="Please Select"
        data={DATA}
        searchPlaceHolder
        defaultValue={eventName }
        onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
            setEventName(selectedItem)
          
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
       flexDirection:"row",
    }

})
export default DropModal