import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View, Switch, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { s } from "react-native-size-matters";
import { useSelector } from "react-redux";
import * as ApisService from "../../providers/apis/apis";
import { ScrollView } from "react-native-gesture-handler";
import EventType from "../../componet/EventType";
import DatePicker from 'react-native-date-picker'
import { getCurrentDateTime, formatedDateTime } from "../../providers/global/global";
const datee = new Date()

const AayojanPage = ({ navigation }) => {

    const userData = useSelector(state => state.userData)
    const [image, setImage] = useState(null)
    const [isSelected, setIsSelected] = useState(false)
    const [title, setTitle] = useState()
    const [discription, setDiscription] = useState()
    const [address, setAddress] = useState()
    const [indicator, setIndicator] = useState();
    const [datepiker, setDatepiker] = useState(false)
    const [paikerdata, setPaikerdata] = useState(false)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [isEnabled, setIsEnabled] = useState(false);
    // const [isswitch, setSwitech] = useState(false)
    const publisdata = () => {
        let data = new FormData();
        data.append('image', {
            name: image.modificationDate + '.jpg',
            type: image.mime,
            uri: Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path,
        });
        console.log("data::::::::::::::::", JSON.stringify(data))
        data.append('user_id', userData.user.id);
        data.append('title', title);
        data.append('description', discription);
        data.append('address', address);
        data.append("start_date_time", formatedDateTime(startDate, "YYYY-MM-DD").toString());
        data.append("end_date_time", formatedDateTime(endDate, "YYYY-MM-DD").toString());
        data.append('is_public', isSelected);
        data.append('event_type', indicator);

        // console.log("data", data)
        ApisService.eventscreate(data)
            .then(response => {
                console.log("response::::", response)

                if (response.status) {
                    navigation.navigate("AayojanTab")
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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView style={styles.maincontainer}>
                <Image
                    style={styles.imagecontener}
                    source={{ uri: image ? image.path : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" }} />
                {console.log("image", image)}
                <View style={styles.uploadcontern}>
                    <Fontisto name={"upload"} size={s(17)} color="black" />
                    <TouchableOpacity onPress={() => uploaded()}>
                        <Text style={styles.textcontainer}>Upooad pictures (optional) </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={{ marginLeft: 10, fontSize: 17, color: "black", fontWeight: "600" }}>Event Type*</Text>
                    <EventType indicator={indicator} setIndicator={setIndicator} />
                    <Text style={{ marginLeft: 10, fontSize: 17, color: "black", fontWeight: "600" }}>Event Name*</Text>
                    < TextInput
                        style={styles.inputcontainer}
                        placeholder="Write event name"
                        autoCapitalize="none"
                        onChangeText={(e) => setTitle(e)}
                        placeholderTextColor="black"

                    />
                    <Text style={{ marginLeft: 10, fontSize: 17, color: "black", fontWeight: "600" }}>Address*</Text>
                    < TextInput
                        style={styles.inputcontainer}
                        placeholder="Enter place"
                        autoCapitalize="none"
                        onChangeText={(e) => setAddress(e)}
                        placeholderTextColor="black"

                    />
                    <Text style={styles.textcontainer}>Start Date*</Text>
                    <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => setDatepiker(!datepiker)}>
                        <Text style={styles.inertextcontainer}>{startDate ? formatedDateTime(startDate, "YYYY/MM/DD") : "Enter Start Date"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.textcontainer}>End Date*</Text>
                    <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => setPaikerdata(!paikerdata)}>
                        <Text style={styles.inertextcontainer}>{endDate ? formatedDateTime(endDate, "YYYY/MM/DD") : "Enter end Date"}</Text>
                    </TouchableOpacity>
                    <View style={styles.containerSwitch}>
                        <Text style={{ fontSize: 19, color: "black", fontWeight: "600" }}>Public</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isSelected ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={()=>setIsSelected(!isSelected)}
                        value={isSelected}
                        />
                        {console.log("isSelected",isSelected)}
                    </View>
                    <Text style={{ marginLeft: 10, fontSize: 17, color: "black", fontWeight: "600", marginTop: 15 }}>Description(50-5000 charctors)*</Text>
                    < TextInput
                        style={styles.inputcontainer1}
                        placeholder="Tell us more about this event."
                        autoCapitalize="none"
                        multiline={true}
                        onChangeText={(e) => setDiscription(e)}
                        placeholderTextColor="black"
                        maxLength={5000}
                    />
                    <Text style={{ textAlign: "center", fontSize: 20, color: "black" }}>Upload more Attachment</Text>

                    <TouchableOpacity onPress={() => publisdata()} style={{ alignSelf: "center", marginTop: 22 }}>
                        <Text style={{ fontSize: 18, fontWeight: "500", borderColor: "#ccc", borderWidth: 1, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8, backgroundColor: "#ffd470" }}>ADD EVENT</Text>
                    </TouchableOpacity>
                </View>
                <DatePicker
                    modal
                    open={datepiker}
                    date={datee}
                    onConfirm={(date) => {
                        setStartDate(date)
                        setDatepiker(!datepiker)
                    }}
                    onCancel={() => {
                        console.log("date")
                    }}
                    mode={'date'}
                />
                <DatePicker
                    modal
                    open={paikerdata}
                    date={datee}
                    onConfirm={(date) => {
                        setEndDate(date)
                        setPaikerdata(!paikerdata)

                    }}
                    onCancel={() => {
                        console.log("date")
                    }}
                    mode={'date'}
                />
            </ScrollView>
        </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({
    // maincontainer: {
    //     flex: 1
    // },
    imagecontener: {
        width: s(320),
        height: s(170),
        margin: s(15),
        borderRadius: s(12)
    },
    textcontainer: {
        fontWeight: "500",
        color: "black"
    },
    uploadcontern: {
        flexDirection: "row",
        justifyContent: "center"
    },
    radiobutton: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: s(25)
    },
    inputcontainer: {
        borderWidth: 1,
        width: "96%",
        alignSelf: "center",
        borderRadius: s(8),
        marginTop: 12,
        backgroundColor: "#ffd470",
        borderColor: "#ccc",

    },
    inputcontainer1: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: "96%",
        paddingVertical: 50,
        alignSelf: "center",
        borderRadius: s(8),
        backgroundColor: "#ffd470",
        marginTop: 12
    },
    container: {
        flex: 1
    },
    inertextcontainer: {
        borderWidth: 1,
        borderColor: "#bbb",
        width: "95%",
        height: 50,
        borderRadius: 20,
        marginTop: 15,
        padding: 15,
        paddingRight: 40,
    },
    containerSwitch: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15
    }
})
export default AayojanPage