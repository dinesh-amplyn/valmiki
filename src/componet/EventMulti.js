import React, { useState,useEffect } from "react";
import { ScrollView, TouchableWithoutFeedback, ActivityIndicator, Modal, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import { s, ms, vs } from "react-native-size-matters";
import MultiSelect from 'react-native-multiple-select';

const EventMulti = (props) => {
const {setIsSelected,isSelected} = props
const [data,setData]=useState()
    useEffect(() => {
        dataList()
    }, []);
    const dataList = () => {
        let data = {
            params: {
                user_id:userData.user.id,
                type:'past'
            }
        }
        ApisService.eventslisting(data)
            .then(response => {
                console.log('response::::', response)
                if (response.status) {
                    setData(response.data)
                    console.log("response.status", response.status)
                    console.log("response.data", response.data)
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    
    return (
        <View style={styles.SelectDropdown}>
        <MultiSelect
styleDropdownMenu={{width:350,marginLeft:18,height:50}}

          hideTags
          items={data}
          uniqueKey="id"
        //   ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={(aa)=>console.log(aa)}
        //   selectedItems={isSelected}
          selectText="send privet invitation"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={ (text)=> console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"

          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
    </View>
    )
}
const styles = StyleSheet.create({
    SelectDropdown:{
       flexDirection:"row"

    }

})
export default EventMulti