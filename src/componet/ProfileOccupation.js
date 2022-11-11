import React, { useEffect, useState } from "react";
import { ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { s, ms, vs } from "react-native-size-matters";
import SelectDropdown from 'react-native-select-dropdown'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { objectTraps } from "immer/dist/internal";

const ProfileOccupation = (props) => {
    const {setJobid,jobid,data} = props
    const [occupation,setOccupation]=useState([])
    useEffect(()=>{
        handaldata()
    },[])
    console.log("data",data)

     const handaldata=()=>{
        let newarr=[]
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                newarr.push(data[key]) 
            }
          }
          console.log("newarr",newarr)
          setOccupation(newarr)
     }
     console.log(jobid)
     const handaljobid=(item)=>{
     let valuse=   Object.keys(data).find(key=>data[key]===item)
setJobid(valuse)
     }
    return (
        <View style={styles.SelectDropdown}>
            {console.log("$$$$$$$$$$$$$$occupation",occupation)}
        <SelectDropdown
         buttonStyle={{borderRadius:100,width:"95%",  borderWidth: 1,
            borderRadius: 20,
            borderColor:'#bbb',
            backgroundColor: '#ffd470',}}

            selectedRowTextStyle={{color:'#fff'}}
        defaultButtonText="selecte Occupation"
        data={occupation}
        
        searchPlaceHolder
        defaultValue={data[jobid]}
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
export default ProfileOccupation