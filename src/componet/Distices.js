import React, { useState,useEffect } from "react";
import { ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { s, ms, vs } from "react-native-size-matters";
import SelectDropdown from 'react-native-select-dropdown'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Distices = (props) => {
    const {setDistrict,district,data,stateid} = props
    const [state,setState]=useState([])
    useEffect(()=>{
        handaldata()
        console.log("inuseeffect")

    },[])
    console.log("district:::::::::::::;",state)
    console.log("districtdata:::::::::::::;",data)
    console.log("districtdatastateid:::::::::::::;",stateid)
     const handaldata=()=>{
        let newarr=[]
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                newarr.push(data[key]) 
            }
          }
          console.log("newarr",newarr)
          setState(newarr)
     }
     const handaljobid=(item)=>{
        let valuse=   Object.keys(data).find(key=>data[key]===item)
        setDistrict(valuse)
        }
    return (
        <View style={styles.SelectDropdown}>
        <SelectDropdown
         buttonStyle={{borderRadius:100,width:"95%",  borderWidth: 1,
            borderRadius: 20,
            borderColor:'#bbb',
            backgroundColor: '#ffd470',}}

            selectedRowTextStyle={{color:'#fff'}}
        defaultButtonText="Select district "
        data={state}
        
        searchPlaceHolder
        defaultValue={district}
        onSelect={(selectedItem, index) => {
            handaljobid(selectedItem)
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
export default Distices