import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { ScrollView, KeyboardAvoidingView, ActivityIndicator, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, Modal, } from 'react-native';
import { s } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { getCurrentDateTime, formatedDateTime } from "../../providers/global/global";
import ImagePicker from 'react-native-image-crop-picker';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import * as ApisService from "../../providers/apis/apis";
import DatePicker from 'react-native-date-picker'
import DropDown from "../../componet/DropDown";
import DropModal from "../../componet/DropModal";
import Gander from "../../componet/Gander";
import MartalStaus from "../../componet/MartalStaus";
import Height from "../../componet/Height";
import Education from "../../componet/Education";
import ProfileOccupation from "../../componet/ProfileOccupation";
import ProfileIncome from "../../componet/ProfileIncome";
import ProfileGoter from "../../componet/ProfileGoter";
import State from "../../componet/State";
import Distices from "../../componet/Distices";

const CreateProfiles = ({ navigation, route }) => {

    const userData = useSelector(state => state.userData)
    const [image, setImage] = useState(null)
    const [number, setNumber] = useState([{ inputs: "" }])
    const [name, setName] = useState()
    const [indicator, setIndicator] = useState();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [village, setVillage] = useState();
    const [eventName, setEventName] = useState();
    const [birthplace, setbirthplace] = useState();
    const [eventPlace, setEventPlace] = useState();
    const [mourningFamily, setMourningFamily] = useState();
    const [condolenceMessage, setCondolenceMessage] = useState();
    const [datepiker, setDatepiker] = useState(false)
    const [paikerdata, setPaikerdata] = useState(false)
    const [stateid, setStateid] = useState()
    const [aboutprofile, setAboutprofile] = useState();
    const [contactperson, setContactperson] = useState()
    const [pincode, setPincode] = useState();
    const [address, setAddress] = useState()
    const [contactnumber, setContactnumber] = useState()
    const [email, setEmail] = useState()
    const [mobile, setMobile] = useState()
    const [staticdata, setStaticdata] = useState()
    // const [staticdata, setStaticdata] = useState()
    const [currentposting, setCurrentposting] = useState()
    const [jobid, setJobid] = useState(null);
    const [education, setEducation] = useState(null);
    const [heigth, setHeigth] = useState(null);
    const [marital, setMarital] = useState(null);
    const [gander, setGander] = useState(null);
    const [fathername, setFathername] = useState();
    const [state, setState] = useState();
    const [district, setDistrict] = useState();
    const [incomedata, setIncomedata] = useState({
        title: null,
    })
    const [goter, setGoter] = useState([{
        gotra_type: null,
        gotra_name: null
    }])
    useEffect(() => {
        staticitem()
        citiesstates()
    }, [])

    const staticitem = () => {

        ApisService.allstaiclist()
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    // navigation.navigate("TopTab")
                    setStaticdata(response)
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    const citiesstates = () => {

        ApisService.citiesstates()
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    // navigation.navigate("TopTab")
                    setState(response)
                }
            }).catch(error => {
                alert(error.message);
            });
    }

    const datee = new Date()
    const statusData = [
        {
            id: 1,
            status: 'Basic',
            isCompleted: true,
        },
        {
            id: 2,
            status: 'Education',
            isCompleted: false,
        },
        {
            id: 3,
            status: 'Relative',
            isCompleted: false,
        },
        {
            id: 4,
            status: 'Gallery',
            isCompleted: false,
        },
    ]

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
        data.append("dob", formatedDateTime(startDate).toString());
        data.append("birth_time", formatedDateTime(endDate).toString());
        data.append("condolence_message", condolenceMessage);
        data.append("native_village", village);
        data.append("event_name", eventName);
        // data.append("event_datetime", formatedDateTime(eventDate).toString());
        data.append("event_place", eventPlace);
        data.append("mourning_family", mourningFamily);
        data.append("pincode", pincode);
        data.append("address", address);
        data.append("state_id", stateid);
        data.append("contact_number", contactnumber);
        data.append("contact_person", contactperson);
        data.append("about_profile", aboutprofile);
        data.append("email", email);
        data.append("mobile", mobile);
        data.append("income_min", incomedata.min);
        data.append("income_max", incomedata.mix);
        data.append("current_posting", currentposting);
        data.append("highest_education_id", education);
        data.append("height", heigth);
        data.append("job_id", jobid);
        data.append("gender", gander);
        data.append("father_name", fathername);
        data.append("marital_status_id", marital);
        data.append("birth_place", birthplace);
        // for (let i = 0; i < number.length; i++) {
        //     data.append('mobiles[]', number[i].inputs)
        // }
        console.log("data::::::::::::::::", JSON.stringify(data))
        ApisService.profilescreate(data)
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    // navigation.navigate("TopTab")
                }
            }).catch(error => {
                alert(error.message);
            });
    }

    const inputchang = (i, index) => {
        let newgoter = [...goter];
        newgoter[index].gotra_name = i;
        setGoter(newgoter);
    }
    const addmoregoter = () => {
        if (goter.length <= 4) {
            let newgoter = [...goter]
            let obj = {
                gotra_type: null,
                gotra_name: null
            }
            newgoter.push(obj)
            setGoter(newgoter);
            // console.log(number)
        }
    }
    const remove = (index) => {
        let newgoter = [...goter]
        newgoter.splice(index, 1)
        setGoter(newgoter);
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
    // const setdata = () => {
    //     if (route && route.params) {
    //         updateimage()
    //     }
    //     else {
    //         setdata()
    //     }
    // }
    const Handaldistce = useCallback(() => {
        return(
            <Distices setDistrict={setDistrict} district={district} data={state.cities[stateid]} stateid={stateid} />
        )
    }, [stateid])
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keycontainer}
        >

            <ScrollView style={styles.cantainer}>
                <View style={styles.deliveryStatusBarContainer}>
                    {statusData.map((item, index) =>
                        <View style={styles.deliveryStatusBarInnerContainer} key={item.id}>
                            {index != 0 &&
                                <View style={[styles.statusBarLine, { backgroundColor: item.isCompleted ? "orange" : "black" }]} />
                            }
                            <View style={[styles.statusIcon, { borderColor: item.isCompleted ? "orange" : "black" }]} />
                        </View>
                    )}

                </View>
                <View style={styles.deliveryStatusTextContainer}>
                    {statusData.map((item, index) =>
                        <Text key={item.id} style={[styles.deliveryStatusText, { color: item.isCompleted ? "#aaa" : "#aaa" }]}>{item.status}</Text>
                    )}
                </View>
                <TouchableOpacity style={styles.ImagePickercantainer} onPress={() => uploaded()}>
                    <Image
                        style={styles.imagecontener}
                        source={{ uri: image ? image.path.replace("localhost", "192.168.29.196") : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" }} />
                    {/* {console.log("image", image)} */}
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(40) }}>Name*</Text>
                    <View style={{ paddingLeft: 20 }}>
                        {/* <TouchableOpacity >
                            <DropDown setIndicator={setIndicator} indicator={indicator} />
                        </TouchableOpacity> */}
                        < TextInput
                            style={styles.inputcontainer}
                            placeholder="Name"
                            autoCapitalize="none"
                            onChangeText={(e) => setName(e)}
                            placeholderTextColor="black"
                            value={name}
                        />
                    </View >
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Father Name*</Text>
                    <View style={{ paddingLeft: 20 }}>

                        < TextInput
                            style={styles.inputcontainer}
                            placeholder="Father Name"
                            autoCapitalize="none"
                            onChangeText={(e) => setFathername(e)}
                            placeholderTextColor="black"
                            value={name}
                        />
                    </View >
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Gender*</Text>
                    <View style={{ paddingLeft: 20, marginTop: 15 }}>

                        <TouchableOpacity >
                            {staticdata && <Gander gander={gander} setGander={setGander} data={staticdata.genders} />}
                        </TouchableOpacity>
                    </View >
                    <Text style={styles.textcontainer}>DOB*</Text>
                    <TouchableOpacity onPress={() => setDatepiker(!datepiker)} style={{ paddingLeft: 20, }}>
                        <Text style={styles.inertextcontainer}>{startDate ? formatedDateTime(startDate) : "DOB"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.textcontainer}>Birth Time*</Text>
                    <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => setPaikerdata(!paikerdata)}>
                        <Text style={styles.inertextcontainer}>{endDate ? formatedDateTime(endDate) : "Birth Time"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.textcontainer}>Birth Place*</Text>
                    <View style={{ paddingLeft: 20 }}>
                        < TextInput
                            style={styles.inputcontainer1}
                            placeholder="Birth Place"
                            autoCapitalize="none"
                            onChangeText={(e) => setbirthplace(e)}
                            placeholderTextColor="black"
                            value={village}
                        />
                    </View>
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Marrital Status*</Text>
                    <View style={{ paddingLeft: 20, marginTop: 15 }}>

                        <TouchableOpacity >
                            {staticdata && <MartalStaus setMarital={setMarital} marital={marital} data={staticdata.marital_status} />}
                        </TouchableOpacity>
                    </View >
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Heigth*</Text>
                    <View style={{ paddingLeft: 20, marginTop: 15 }}>

                        <TouchableOpacity >
                            {staticdata && <Height setHeigth={setHeigth} height={heigth} data={staticdata.heights} />}
                        </TouchableOpacity>
                    </View >
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Highest Education*</Text>
                    <View style={{ paddingLeft: 20, marginTop: 15 }}>

                        <TouchableOpacity >
                            {staticdata && <Education setEducation={setEducation} education={education} data={staticdata.educations} />}
                        </TouchableOpacity>
                    </View >
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}> Occupation*</Text>
                    <View style={{ paddingLeft: 20, marginTop: 15 }}>
                        <TouchableOpacity >
                            {staticdata && <ProfileOccupation setJobid={setJobid} jobid={jobid} data={staticdata.jobs} />}
                        </TouchableOpacity>
                    </View >
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Income*</Text>
                    <View style={{ paddingLeft: 20, marginTop: 15 }}>
                        <TouchableOpacity >

                            <ProfileIncome incomedata={incomedata} setIncomedata={setIncomedata} />
                        </TouchableOpacity>
                    </View >
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Current Posting*</Text>
                    <View style={{ paddingLeft: 20 }}>

                        < TextInput
                            style={styles.inputcontainer}
                            placeholder="Current Posting"
                            autoCapitalize="none"
                            onChangeText={(e) => setCurrentposting(e)}
                            placeholderTextColor="black"
                        // value={name}
                        />
                    </View >
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Native village*</Text>
                    <View style={{ paddingLeft: 20 }}>

                        < TextInput
                            style={styles.inputcontainer}
                            placeholder="Native village"
                            autoCapitalize="none"
                            onChangeText={(e) => setVillage(e)}
                            placeholderTextColor="black"
                        // value={name}
                        />
                    </View >
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Mobile*</Text>
                    <View style={{ paddingLeft: 20 }}>

                        < TextInput
                            style={styles.inputcontainer}
                            placeholder="Mobile"
                            autoCapitalize="none"
                            onChangeText={(e) => setMobile(e)}
                            placeholderTextColor="black"
                            maxLength={10}
                        // value={name}
                        />
                    </View >
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Email*</Text>
                    <View style={{ paddingLeft: 20 }}>

                        < TextInput
                            style={styles.inputcontainer}
                            placeholder="Email"
                            autoCapitalize="none"
                            onChangeText={(e) => setEmail(e)}
                            placeholderTextColor="black"
                            value={name}
                        />
                    </View >
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>About profile*</Text>
                    <View style={{ paddingLeft: 20 }}>

                        < TextInput
                            style={styles.inputcontainer}
                            placeholder="About profile"
                            autoCapitalize="none"
                            onChangeText={(e) => setAboutprofile(e)}
                            placeholderTextColor="black"
                        // value={name}
                        />
                    </View >
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Contect person*</Text>
                    <View style={{ paddingLeft: 20 }}>

                        < TextInput
                            style={styles.inputcontainer}
                            placeholder="Contect person"
                            autoCapitalize="none"
                            onChangeText={(e) => setContactperson(e)}
                            placeholderTextColor="black"
                        // value={name}
                        />
                    </View >
                    <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Contect number*</Text>
                    <View style={{ paddingLeft: 20 }}>

                        < TextInput
                            style={styles.inputcontainer}
                            placeholder="Contect number"
                            autoCapitalize="none"
                            onChangeText={(e) => setContactnumber(e)}
                            placeholderTextColor="black"
                        // value={name}
                        />
                    </View >

                    <View style={{ backgroundColor: "#ffd470", marginTop: 20, margin: 8 }}>
                        <Text style={{ fontSize: 20, color: "black", textAlign: "center" }}> Goter's</Text>
                        <View style={{ backgroundColor: "white", borderWidth: 1, borderColor: "#ffd470", margin: 2, padding: 8 }}>
                            {goter.map((i, index) => {
                                return (
                                    <View style={{ paddingLeft: 20 }}>
                                        <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginBottom: 20 }}>Goter type*</Text>
                                        <TouchableOpacity>
                                            <ProfileGoter goter={goter} setGoter={setGoter} index={index} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginTop: s(20) }}>Goter name*</Text>
                                        < TextInput
                                            style={styles.inputcontainer1}
                                            placeholder="Goter namer"
                                            autoCapitalize="none"
                                            onChangeText={e => inputchang(e, index)}
                                            placeholderTextColor="black"
                                            maxLength={10}
                                        // value={i}
                                        />
                                        {index ? <TouchableOpacity onPress={() => remove(i, index)} style={{ position: "absolute", bottom: 8, right: 0 }}>
                                            <Entypo style={styles.arrowIcon} name={"circle-with-cross"} size={s(30)} color="white" />
                                        </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => addmoregoter()} style={{ position: "absolute", bottom: 1, right: 15 }}>
                                                <Fontisto style={styles.arrowIcon} name={"plus-a"} size={s(42)} color="white" />
                                            </TouchableOpacity>
                                        }
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{ backgroundColor: "#ffd470", marginTop: 20, margin: 8 }}>
                        <Text style={{ fontSize: 20, color: "black", textAlign: "center" }}> Address</Text>
                        <View style={{ backgroundColor: "white", borderWidth: 1, borderColor: "#ffd470", margin: 2, padding: 8 }}>
                            <Text style={styles.textcontainer}>State*</Text>
                            <TouchableOpacity style={{ paddingLeft: 20 }}>
                                {/* <Text style={styles.inertextcontainer}>Please Select </Text> */}
                                {state && <State setStateid={setStateid} stateid={stateid} data={state.states} />}

                            </TouchableOpacity>
                            <Text style={styles.textcontainer}>District*</Text>
                            <TouchableOpacity style={{ paddingLeft: 20 }}>
                                <Handaldistce/>
                            </TouchableOpacity>

                            <Text style={styles.textcontainer}>Village/Town/City*</Text>
                            <View style={{ paddingLeft: 20 }}>
                                < TextInput
                                    style={styles.inputcontainer1}
                                    placeholder="Village/Town/City"
                                    autoCapitalize="none"
                                    onChangeText={(e) => setVillage(e)}
                                    placeholderTextColor="black"
                                // value={eventPlace}
                                />
                            </View>
                            <Text style={styles.textcontainer}>Address*</Text>
                            <View style={{ paddingLeft: 20 }}>
                                < TextInput
                                    style={styles.inputcontainer1}
                                    placeholder="Locality/Village"
                                    autoCapitalize="none"
                                    onChangeText={(e) => setAddress(e)}
                                    placeholderTextColor="black"
                                // value={eventPlace}
                                />
                            </View>
                            <Text style={styles.textcontainer}>Pincode*</Text>
                            <View style={{ paddingLeft: 20 }}>
                                < TextInput
                                    style={styles.inputcontainer1}
                                    placeholder="Pincode"
                                    autoCapitalize="none"
                                    onChangeText={(e) => setPincode(e)}
                                    placeholderTextColor="black"
                                // value={pincode}
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => setdata()} style={{ justifyContent: "center", alignItems: "center", margin: 40 }}>
                        <Text style={{ fontSize: 22, borderWidth: 1, width: "85%", textAlign: "center", borderRadius: 10, backgroundColor: "#ffd470", color: "white" }}>SUBMIT & CONTINUE</Text>
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
                        mode={"time"}
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
        marginTop: 30
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
        width: "95%",
        borderRadius: s(8),
        marginTop: 12,
        backgroundColor: "#ffd470",
        borderColor: "#ccc",
        borderRadius: 20,
        height: 50
    },
    inputcontainer1: {
        borderWidth: 1,
        width: "95%",
        borderRadius: s(8),
        marginTop: 12,
        backgroundColor: "#ffd470",
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
        backgroundColor: "#ffd470"
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
    },
    deliveryStatusBarContainer: {
        flexDirection: 'row',
        // marginBottom: s(14),
        // marginTop: s(-14),
        justifyContent: 'center'
    },
    deliveryStatusBarInnerContainer: {
        flexDirection: 'row',
    },
    statusBarLine: {
        height: s(1),
        width: s(70),
        alignSelf: 'center',
        backgroundColor: "black"
    },
    statusIcon: {
        borderRadius: 100,
        width: 20,
        height: 20,
        backgroundColor: "#fff",
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: "orange"
    },
    deliveryStatusTextContainer: {
        flexDirection: 'row',
        paddingHorizontal: s(8),
        justifyContent: 'space-evenly',
        paddingBottom: s(15),
        borderBottomWidth: s(0.6),
        borderBottomColor: "#aaa"
    },
})
export default CreateProfiles