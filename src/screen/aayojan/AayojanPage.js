import React, { useState, useEffect } from "react";
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
import EventMulti from "../../componet/EventMulti";
const datee = new Date()

const AayojanPage = ({ navigation, route }) => {

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
    const [id, setId] = useState()
    const [selectdata, setSelectdata] = useState([])
    const [isModalVisible, setModalVisible] = useState(false);
    // const {values} = route.params

    useEffect(() => {
        if (route && route.params) {
            const { title, description, image, address, is_public, id, start_date_time, end_date_time, event_type } = route.params.values
            setTitle(title)
            console.log("imagepath", image)
            setDiscription(description)
            setImage({ path: image })
            setIsSelected(is_public)
            setStartDate(start_date_time)
            setEndDate(end_date_time)
            setIndicator(event_type)
            setAddress(address)
            setId(id)
        }
    }, [])
    const updatenews = () => {
        let data = {
            user_id: userData.user.id,
            title: title,
            description: discription,
            address: address,
            is_public: isSelected,
            id: id,
            start_date_time: startDate,
            end_date_time: endDate,
            event_type: indicator
        }
        ApisService.eventsupdate(data)
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    navigation.navigate("AayojanTab")
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
        ApisService.eventsupdateimage(data)
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    updatenews()
                    navigation.navigate("AayojanTab")

                }
            }).catch(error => {
                alert(error.message);
            });
    }
    const publisdata = () => {
        let data = new FormData();
        data.append('images[]', {
            name: image.modificationDate + '.jpg',
            type: image.mime,
            uri: Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path,
        });
        console.log("data::::::::::::::::", JSON.stringify(data))
        data.append('user_id', userData.user.id);
        data.append('title', title);
        data.append('description', discription);
        data.append('address', address);
        data.append("start_date_time", formatedDateTime(startDate).toString());
        data.append("end_date_time", formatedDateTime(endDate).toString());
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
    const publisevent = () => {
        if (route && route.params) {
            updateimage()
        }
        else {
            publisdata()
        }
    }
    const handeldata = (e) => {
        let dataitem = [...selectdata]
        let index = selectdata.findIndex(item => item == e)
        if (index == -1) {
            dataitem.push(e)
            console.log("dataitem", dataitem)
        } else {
            dataitem.splice(index, 1)
        }
        setSelectdata(dataitem)

    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView style={styles.maincontainer}>
                <Image
                    style={styles.imagecontener}
                    source={{ uri: image ? image.path.replace("localhost", "192.168.29.196") : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" }} />
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
                        value={title}
                    />
                    <Text style={{ marginLeft: 10, fontSize: 17, color: "black", fontWeight: "600" }}>Address*</Text>
                    < TextInput
                        style={styles.inputcontainer}
                        placeholder="Enter place"
                        autoCapitalize="none"
                        onChangeText={(e) => setAddress(e)}
                        placeholderTextColor="black"
                        value={address}

                    />
                    <Text style={styles.textcontainer}>Start Date*</Text>
                    <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => setDatepiker(!datepiker)}>
                        <Text style={styles.inertextcontainer}>{startDate ? formatedDateTime(startDate) : "Enter Start Date"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.textcontainer}>End Date*</Text>
                    <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => setPaikerdata(!paikerdata)}>
                        <Text style={styles.inertextcontainer}>{endDate ? formatedDateTime(endDate) : "Enter end Date"}</Text>
                    </TouchableOpacity>
                    <View style={styles.containerSwitch}>
                        <Text style={{ fontSize: 19, color: "black", fontWeight: "600" }}>Public</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isSelected ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setIsSelected(!isSelected)}
                            value={isSelected}
                        />

                        {console.log("isSelected", isSelected)}

                    </View>
                    {!isSelected &&
                        <>
                            <Text style={{ marginLeft: 10, fontSize: 17, color: "black", fontWeight: "600", marginTop: 15 }} >private Invitations*</Text>
                            <TouchableOpacity style={{ borderWidth: 1, flexDirection: "row", paddingHorizontal: 20, height: 40, borderRadius: 10, marginTop: 10, borderColor: "#ccc" }} onPress={() => setModalVisible(true)} >

                                {selectdata.length < 1 ? <Text>selecte user </Text> :
                                    <>
                                        {selectdata.map((item) => (
                                            <Text style={{ alignSelf: "center", fontSize: 18, textAlign: "center" }}>{item}</Text>
                                        ))}
                                    </>
                                }
                            </TouchableOpacity>
                            <EventMulti handeldata={handeldata} selectdata={selectdata} isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
                        </>
                    }

                    <Text style={{ marginLeft: 10, fontSize: 17, color: "black", fontWeight: "600", marginTop: 15 }}>Description(50-5000 charctors)*</Text>
                    < TextInput
                        style={styles.inputcontainer1}
                        placeholder="Tell us more about this event."
                        autoCapitalize="none"
                        multiline={true}
                        onChangeText={(e) => setDiscription(e)}
                        placeholderTextColor="black"
                        maxLength={5000}
                        value={discription} />

                    <Text style={{ textAlign: "center", fontSize: 20, color: "black" }}>Upload more Attachment</Text>
                    <TouchableOpacity onPress={() => publisevent()} style={{ alignSelf: "center", marginTop: 22 }}>
                        <Text style={{ fontSize: 18, fontWeight: "500", borderColor: "#ccc", borderWidth: 1, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8, backgroundColor: "#ffd470" }}>ADD EVENT</Text>
                    </TouchableOpacity>
                </View>
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
                    mode={"datetime"}
                />
                <DatePicker
                    modal
                    open={paikerdata}
                    date={datee}
                    value={endDate}

                    onConfirm={(date) => {
                        setEndDate(date)
                        setPaikerdata(!paikerdata)

                    }}
                    onCancel={() => {
                        console.log("date")
                    }}
                    mode={"datetime"}
                />
            </ScrollView>
        </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({
    maincontainer: {
        flex: 1
    },
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
    inputcontainer2: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: "96%",
        // paddingVertical: 50,
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