import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { ScrollView, KeyboardAvoidingView, ActivityIndicator, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, Modal, } from 'react-native';
import { s } from "react-native-size-matters";
import { useSelector, useDispatch } from "react-redux";
import ImagePicker from 'react-native-image-crop-picker';
import * as ApisService from "../../providers/apis/apis";

const UplodeImage = ({ navigation, route, handaldata }) => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData)
    const [image, setImage] = useState(null)
    
    const setdata = () => {
        let data = new FormData();
        data.append('other_image', {
            name: image.modificationDate + '.jpg',
            type: image.mime,
            uri: Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path,
        });
        data.append(' profile_id',userData.user.profile_id);
        console.log("data::::::::::::::::", JSON.stringify(data))
        ApisService.profilesotherimage(data)
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    console.log(response.status)
                    // let newuser = userData.user
                    // newuser = { ...newuser, profile_id: response.profile_id }
                    // dispatch(setUserData({ ...userData, user: newuser }))
                    // handaldata("Education")
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    const uploaded = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setImage(image)
            console.log(image);
        });
    }

    return (

        <ScrollView style={styles.cantainer}>

            <TouchableOpacity style={styles.ImagePickercantainer} onPress={() => uploaded()}>
                <Image
                    style={styles.imagecontener}
                    source={{ uri: image ? image.path.replace("localhost", "192.168.29.196") : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" }} />
            </TouchableOpacity>
            <View>

                <TouchableOpacity onPress={() => setdata()} style={{ justifyContent: "center", alignItems: "center", margin: 40 }}>
                    <Text style={{ fontSize: 22, borderWidth: 1, width: "85%", textAlign: "center", borderRadius: 10, backgroundColor: "#ffd470", color: "white" }}>SUBMIT</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    cantainer: {
        flex: 1,
        marginTop: 30
    },
    imagecontener: {
        width: s(250),
        height: s(250),
        borderRadius: s(10),
        borderWidth: s(5),
        borderColor: "#ffd470",
    },
    ImagePickercantainer: {
        alignSelf: "center",
        marginTop: s(20)
    },


})
export default UplodeImage