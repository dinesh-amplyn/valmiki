import React, { useState,useEffect } from "react";
import { ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { s, ms, vs } from "react-native-size-matters";
import SelectDropdown from 'react-native-select-dropdown'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Education = (props) => {
    // const DATA = ["on school","MTech/ME/march","MS/MD","BED","LLB","LLM","BCA","BBA","MBA","MCA","PRIMARY SCHOOL","B.PHARMA","M.PHARMA","M.DES","CA/CS/CFA","PHD","OTHER","MIDDLE SCHOOL","HIGHT SCHOOL","Diploma","BA/BCOMM/BSC","MA/MCOM/MSC","MTECH/BE/BARCH","MBBS/BDS"]
    const {setEducation,education,data,index,type} = props
    const [educatin,setEducatin]=useState([])
    // console.log(education)
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
          setEducatin(newarr)
     }
     const handelgoter = (item) => {
        if(type=="Basic"){
            setEducation(item)
        }else
            
          {  let newgoter=[...education]
            newgoter[index].education_id=item
            setEducation(newgoter)
        }
            }
    return (
        <View style={styles.SelectDropdown}>
        <SelectDropdown
         buttonStyle={{borderRadius:100,width:"95%",  borderWidth: 1,
            borderRadius: 20,
            borderColor:'#bbb',
            backgroundColor: '#ffd470',}}

            selectedRowTextStyle={{color:'#fff'}}
        defaultButtonText="selecte education"
        data={educatin}
        
        searchPlaceHolder
        defaultValue={education}
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
    SelectDropdown:{
       flexDirection:"row"

    }

})
export default Education