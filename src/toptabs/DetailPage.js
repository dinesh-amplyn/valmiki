import React, { useEffect, useState, useLayoutEffect } from "react";
import { ScrollView, KeyboardAvoidingView, ActivityIndicator, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, Modal, } from 'react-native';
import { s } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { getCurrentDateTime, formatedDateTime } from "../providers/global/global";
import ImagePicker from 'react-native-image-crop-picker';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import * as ApisService from "../providers/apis/apis";
import DatePicker from 'react-native-date-picker'
import DropDown from "../componet/DropDown";
import DropModal from "../componet/DropModal";
const DetailPage = ({ navigation, route }) => {

    const userData = useSelector(state => state.userData)
    const [image, setImage] = useState(null)
    const [number, setNumber] = useState([{ inputs: "" }])
    const [name, setName] = useState()
    const [indicator, setIndicator] = useState();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [village, setVillage] = useState();
    const [eventName, setEventName] = useState();
    const [eventDate, setEventDate] = useState(null);
    const [eventPlace, setEventPlace] = useState();
    const [mourningFamily, setMourningFamily] = useState();
    const [condolenceMessage, setCondolenceMessage] = useState();
    const [datepiker, setDatepiker] = useState(false)
    const [paikerdata, setPaikerdata] = useState(false)
    const [eventy, setEventy] = useState(false)
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState()

    const datee = new Date()
    useEffect(() => {
        if (route && route.params) {
            const {image, id, name_indicator, name, date_of_birth, date_of_death, condolence_message, native_village, event_name, event_datetime, event_place, mourning_family, mobiles } = route.params.values
            setIndicator(name_indicator)
            console.log("name_indicator", name_indicator)
            setName(name)
            setStartDate(date_of_birth)
            setEndDate(date_of_death)
            setCondolenceMessage(condolence_message)
            setVillage(native_village)
            setEventName(event_name)
            setEventDate(event_datetime)
            setEventPlace(event_place)
            setMourningFamily(mourning_family)
            setNumber(mobiles)
            setId(id)
            setImage({ path: image })

        }
    }, [])
    const setdata = () => {

        let data = new FormData();
        data.append('image', {
            name: image.modificationDate + '.jpg',
            type: image.mime,
            uri: image.path
        });
        data.append('user_id', userData.user.id);
        data.append('name_indicator', indicator);
        data.append('name', name);
        data.append("date_of_birth", formatedDateTime(startDate).toString());
        data.append("date_of_death", formatedDateTime(endDate).toString());
        data.append("condolence_message", condolenceMessage);
        data.append("native_village", village);
        data.append("event_name", eventName);
        data.append("event_datetime", formatedDateTime(eventDate).toString());
        data.append("event_place", eventPlace);
        data.append("mourning_family", mourningFamily);
        for (let i = 0; i < number.length; i++) {
            data.append('mobiles[]', number[i].inputs)
        }
        console.log("data::::::::::::::::", JSON.stringify(data))
        ApisService.AnnouncementCreate(data)
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    navigation.navigate("TopTab")
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    const updatedata = () => {
        let data = {
            user_id: userData.user.id,
            name: name,
            name_indicator: indicator,
            date_of_birth: startDate,
            date_of_death: endDate,
            condolence_message: condolenceMessage,
            native_village: village,
            event_name: eventName,
            event_datetime: eventDate,
            event_place: eventPlace,
            mourning_family: mourningFamily,
            mobiles: number,
            id: id,
        }
        ApisService.announcementupdate(data)
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    navigation.navigate("TopTab")
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    const updateimage = () => {
        let data = new FormData();
        data.append('image', {
            name: image.modificationDate + '.jpg',
            type: image.mime,
            uri: Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path,
        });
        console.log("data::::::::::::::::", JSON.stringify(data))
        data.append('user_id', userData.user.id);
        data.append('id', id);
        console.log("imagedata::::::::::::::::", JSON.stringify(data))
        ApisService.announcementsupdateimage(data)
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    updatedata()
                    navigation.navigate("AayojanTab")

                }
            }).catch(error => {
                alert(error.message);
            });
    }
    const inputchang = (i, index) => {
        const list = [...number];
        list[index].inputs = i;
        setNumber(list);
    }
    const addmore = () => {
        if (number.length < 5) {
            setNumber([...number, { inputs: "" }]);
            console.log(number)
        }
    }
    const remove = (index) => {
        const list = [...number]
        list.splice(index, 1)
        setNumber(list);
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
    const handaledata = () => {
        if (route && route.params) {
            updateimage()
        }
        else {
            setdata()
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keycontainer}
        >
            <ScrollView style={styles.cantainer}>
                <TouchableOpacity style={styles.ImagePickercantainer} onPress={() => uploaded()}>
                    <Image
                        style={styles.imagecontener}
                        source={{ uri: image ? image.path.replace("localhost", "192.168.29.196") : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" }} />
                    {/* {console.log("image", image)} */}
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(40) }}>दिव्यगत का नाम*</Text>
                    <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-evenly" }}>
                        <TouchableOpacity >
                            <DropDown setIndicator={setIndicator} indicator={indicator} />
                        </TouchableOpacity>
                        < TextInput
                            style={styles.inputcontainer}
                            placeholder="Name"
                            autoCapitalize="none"
                            onChangeText={(e) => setName(e)}
                            placeholderTextColor="black"
                            value={name}
                        />
                    </View >
                    <Text style={styles.textcontainer}>जन्म-दिवस*</Text>
                    <TouchableOpacity onPress={() => setDatepiker(!datepiker)} style={{ paddingLeft: 20 }}>
                        <Text style={styles.inertextcontainer}>{startDate ? formatedDateTime(startDate) : "date of birth"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.textcontainer}>स्वर्गगमन*</Text>
                    <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => setPaikerdata(!paikerdata)}>
                        <Text style={styles.inertextcontainer}>{endDate ? formatedDateTime(endDate) : "Date of death"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.textcontainer}>शोक संदेश*</Text>
                    <View style={{ paddingLeft: 20 }}>
                        < TextInput
                            style={styles.inputcontainer1}
                            placeholder="Condolence Message"
                            autoCapitalize="none"
                            onChangeText={(e) => setCondolenceMessage(e)}
                            placeholderTextColor="black"
                            value={condolenceMessage}
                        />
                    </View>
                    <Text style={styles.textcontainer}>मूल निवास*</Text>
                    <View style={{ paddingLeft: 20 }}>
                        < TextInput
                            style={styles.inputcontainer1}
                            placeholder="Native Village"
                            autoCapitalize="none"
                            onChangeText={(e) => setVillage(e)}
                            placeholderTextColor="black"
                            value={village}
                        />
                    </View>
                    <View style={{ backgroundColor: "#ffd470", marginTop: 20, margin: 8 }}>
                        <Text style={{ fontSize: 20, color: "black", textAlign: "center" }}> शोक कार्यक्रम</Text>
                        <View style={{ backgroundColor: "white", borderWidth: 1, borderColor: "#ffd470", margin: 2, padding: 8 }}>
                            <Text style={styles.textcontainer}>शोक कार्यक्रम*</Text>
                            <TouchableOpacity style={{ paddingLeft: 20 }}>
                                {/* <Text style={styles.inertextcontainer}>Please Select </Text> */}
                                <DropModal setEventName={setEventName} eventName={eventName} />
                            </TouchableOpacity>
                            <Text style={styles.textcontainer}>दिनांक*</Text>
                            <TouchableOpacity onPress={() => setEventy(!eventy)} style={{ paddingLeft: 20 }}>
                                <Text style={styles.inertextcontainer}>{eventDate ? formatedDateTime(eventDate) : "event date"} </Text>
                            </TouchableOpacity>

                            <Text style={styles.textcontainer}>पता*</Text>
                            <View style={{ paddingLeft: 20 }}>
                                < TextInput
                                    style={styles.inputcontainer1}
                                    placeholder="Event Place"
                                    autoCapitalize="none"
                                    onChangeText={(e) => setEventPlace(e)}
                                    placeholderTextColor="black"
                                    value={eventPlace}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: "#ffd470", marginTop: 20, margin: 8 }}>
                        <Text style={{ fontSize: 20, color: "black", textAlign: "center" }}> मोबाइल</Text>
                        <View style={{ backgroundColor: "white", borderWidth: 1, borderColor: "#ffd470", margin: 2, padding: 8 }}>
                            <Text style={styles.textcontainer}>मोबाइल*</Text>
                            {number.map((i, index) => {
                                return (
                                    <View style={{ paddingLeft: 20 }}>
                                        < TextInput
                                            style={styles.inputcontainer1}
                                            placeholder="Mobile Number"
                                            autoCapitalize="none"
                                            onChangeText={e => inputchang(e, index)}
                                            placeholderTextColor="black"
                                            maxLength={10}
                                            value={i}
                                        />
                                        {index ? <TouchableOpacity onPress={() => remove(i, index)} style={{ position: "absolute", bottom: 8, right: 0 }}>
                                            <Entypo style={styles.arrowIcon} name={"circle-with-cross"} size={s(30)} color="white" />
                                        </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => addmore()} style={{ position: "absolute", bottom: 1, right: 15 }}>
                                                <Fontisto style={styles.arrowIcon} name={"plus-a"} size={s(42)} color="white" />
                                            </TouchableOpacity>
                                        }
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <Text style={styles.textcontainer}>शोककुल*</Text>
                    <View style={{ paddingLeft: 20 }}>
                        < TextInput
                            style={styles.inputcontainer3}
                            placeholder="Mourning Family"
                            autoCapitalize="none"
                            onChangeText={(e) => setMourningFamily(e)}
                            placeholderTextColor="black"
                            value={mourningFamily}
                        />
                    </View>
                    <TouchableOpacity onPress={() => handaledata()} style={{ justifyContent: "center", alignItems: "center", margin: 40 }}>
                        <Text style={{ fontSize: 22, borderWidth: 1, width: "35%", textAlign: "center", borderRadius: 10, backgroundColor: "#ffd470", color: "white" }}>सुचित करे</Text>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={datepiker}
                        date={datee}
                        value={startDate}
                        onConfirm={(date) => {
                            setStartDate(date)
                            setDatepiker(!datepiker)
                        }}
                        onCancel={() => {
                            console.log("date")
                        }}
                        mode={"date"}
                    />
                    <DatePicker
                        modal
                        open={paikerdata}
                        value={endDate}

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
                    <DatePicker
                        modal
                        open={eventy}
                        value={eventDate}
                        date={datee}
                        onConfirm={(date) => {
                            setEventDate(date)
                            setEventy(!eventy)

                        }}
                        onCancel={() => {
                            console.log("date")
                        }}
                        mode={"datetime"}
                    />
                </View>
                {/* <DropDown visible={visible} setVisible={setVisible}/> */}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    cantainer: {
        flex: 1,
    },
    imagecontener: {
        width: s(150),
        height: s(150),
        borderRadius: s(100),
        borderWidth: s(5),
        borderColor: "#ffd470",
    },
    ImagePickercantainer: {
        alignSelf: "center",
        marginTop: s(20)
    },
    inputcontainer: {
        borderWidth: 1,
        width: "50%",
        borderRadius: s(8),
        backgroundColor: "#bbb",
        borderColor: "#ccc",
        borderRadius: 20,
        height: 50,
    },
    inputcontainer1: {
        borderWidth: 1,
        width: "95%",
        borderRadius: s(8),
        marginTop: 12,
        backgroundColor: "#bbb",
        borderColor: "#ccc",
        borderRadius: 20,
        height: 50
    },
    textcontainer: {
        fontSize: s(15),
        color: "black",
        fontWeight: "400",
        marginLeft: s(18),
        marginTop: s(20)
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
    inputcontainer3: {
        borderWidth: 1,
        borderColor: "#bbb",
        width: "95%",
        // height: "40%",
        borderRadius: 20,
        // marginTop: 15,
        // padding: 15,
        paddingRight: 40,
    },
    keycontainer: {
        flex: 1
    },
    arrowIcon: {
        borderRadius: 20,
        backgroundColor: "#ffd470",
    }
})
export default DetailPage