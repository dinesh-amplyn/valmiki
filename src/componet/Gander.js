import React, { useState,useEffect } from "react";
import { ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { s, ms, vs } from "react-native-size-matters";
import SelectDropdown from 'react-native-select-dropdown'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const gander = (props) => {
    // const DATA = ["Female","male"]
    const {setGander,gander,data} = props
    const [ganders,setGanders]=useState([])
    useEffect(()=>{
        handaldata()
    },[])
    // console.log("data",data)
     const handaldata=()=>{
        let newarr=[]
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                newarr.push(data[key]) 
            }
          }
        //   console.log("newarr",newarr)
          setGanders(newarr)
     }
    return (
        <View style={styles.SelectDropdown}>
        <SelectDropdown
         buttonStyle={{borderRadius:100,width:"95%",  borderWidth: 1,
            borderRadius: 20,
            borderColor:'#bbb',
            backgroundColor: '#ffd470',}}

            selectedRowTextStyle={{color:'#fff'}}
        defaultButtonText="selecte Gander"
        data={ganders}
        
        searchPlaceHolder
        defaultValue={gander}
        onSelect={(selectedItem, index) => {
            setGander(selectedItem)
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
    SelectDropdown:{
       flexDirection:"row"

    }

})
export default gander