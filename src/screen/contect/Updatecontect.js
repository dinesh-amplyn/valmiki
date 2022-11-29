import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { ScrollView, KeyboardAvoidingView, ActivityIndicator, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, Modal, } from 'react-native';
import { s } from "react-native-size-matters";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentDateTime, formatedDateTime } from "../../providers/global/global";
import ImagePicker from 'react-native-image-crop-picker';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import * as ApisService from "../../providers/apis/apis";
import DatePicker from 'react-native-date-picker'
import Gander from "../../componet/Gander";
import MartalStaus from "../../componet/MartalStaus";
import Height from "../../componet/Height";
import Education from "../../componet/Education";
import ProfileOccupation from "../../componet/ProfileOccupation";
import ProfileIncome from "../../componet/ProfileIncome";
import ProfileGoter from "../../componet/ProfileGoter";
import State from "../../componet/State";
import Distices from "../../componet/Distices";
import { setUserData } from "../../redux/slices/userSlice";

const Updatecontect = ({ navigation, route, handaldata }) => {
    const dispatch = useDispatch()

    const userData = useSelector(state => state.userData)
const[image,setImage]=useState(null);
    const [name, setName] = useState()
    const [startDate, setStartDate] = useState(null);
    const [village, setVillage] = useState();
    const [datepiker, setDatepiker] = useState(false)
    const [stateid, setStateid] = useState()
    const [pincodes, setPincodes] = useState();
    const [address, setAddress] = useState()
    const [contactnumber, setContactnumber] = useState()
    const [email, setEmail] = useState()
    const [staticdata, setStaticdata] = useState()
    const [currentposting, setCurrentposting] = useState()
    const [jobid, setJobid] = useState(null);
    const [education, setEducation] = useState(null);
    const [marital, setMarital] = useState(null);
    const [gander, setGander] = useState(null);
    const [fathername, setFathername] = useState();
    const [state, setState] = useState();
    const [district, setDistrict] = useState();
    const [facebook, setFacebook] = useState();
    const [id,setId]=useState();

    useEffect(() => {
        if (route && route.params) {
            console.log("route.params", route.params)

            const {id,image,name, father_husband_name, dob, pincode, marital_status_id, current_address, email, gender, occupation, current_posting, education, native_village, facebook_id, state_id, district_id, primary_number } = route.params.value
            setName(name)
            setFathername(father_husband_name)
            setStartDate(dob)
            setMarital(marital_status_id)
            setEducation(education)
            setState(state_id)
            setDistrict(district_id)
            setVillage(native_village)
            setAddress(current_address)
            setPincodes(pincode)
            setJobid(occupation)
            setCurrentposting(current_posting)
            setEmail(email)
            setContactnumber(primary_number)
            setGander(gender)
            setFacebook(facebook_id)
            setImage({ path: image })
            setId(id)
        }
    }, [])

    const updatenews = () => {
        let data = {
            user_id:userData.user.id,
            contactID: userData.user.contactID,
            name: name,
            father_husband_name: fathername,
            gender: gander,
            dob: startDate,
            marital_status_id: marital,
            education: education,
            state_id: "rajasthan",
            district_id:"churu",
            native_village: village,
            current_address:address,
            pincode:pincodes,
            occupation: jobid,
            current_posting: currentposting,
            email:email,
            primary_number:contactnumber,
            facebook_id: facebook,
             id:id,
            //  image:image
        }
        ApisService.contacts_update(data)

            .then(response => {
                console.log('+++++++++++++++--------',data)
                console.log("response::::", response)
                if (response.status) {
                    navigation.navigate("Myinformation")
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    useEffect(() => {
        staticitem()
        citiesstatess()
    }, [])
    const staticitem = () => {
        ApisService.allstaiclist()
            .then(response => {
                // console.log("response::::", response)
                if (response.status) {
                    setStaticdata(response)
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    const citiesstatess = () => {
        ApisService.citiesstates()
            .then(response => {
                // console.log("response::::", response)
                if (response.status) {
                    // navigation.navigate("TopTab")
                    setState(response)
                }
            }).catch(error => {
                alert(error.message);
            });
    }

    const datee = new Date()


    const uploaded = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setImage(image)
            // console.log(image);
        });
    }

   
    // const updatenews = () => {
    //     let data = new FormData();
    //     data.append('image', {
    //         name: image.modificationDate + '.jpg',
    //         type: image.mime,
    //         uri: Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path,
    //     });
    //     // console.log("data::::::::::::::::", JSON.stringify(data))
    //     data.append('user_id', userData.user.id);
    //     data.append('id', userData.user.contactID);
    //     ApisService.contacts_image(data)
    //         .then(response => {
    //             console.log("response::::", data)
    //             if (response.status) {
    //                 updatenews()
    //                 console.log("imagedata::::::::::::::::", response)

    //             }
    //         }).catch(error => {
    //             alert(error.message);
    //         });
    // }
    return (

        <ScrollView style={styles.cantainer}>
            <TouchableOpacity style={styles.ImagePickercantainer} onPress={() => uploaded()}>
               {image&& <Image
                    style={styles.imagecontener}
                    source={{ uri:image&& image.path ? image.path.replace("localhost", "192.168.29.196") : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" }} />
                }
            </TouchableOpacity>
            <View>
                <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(40) }}>Name*</Text>
                <View style={{ paddingLeft: 20 }}>

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
                        value={fathername}
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
                    <Text style={styles.inertextcontainer}>{startDate ? formatedDateTime(startDate, "YYYY-MM-DD") : "DOB"}</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Marrital Status*</Text>
                <View style={{ paddingLeft: 20, marginTop: 15 }}>

                    <TouchableOpacity >
                        {staticdata && <MartalStaus setMarital={setMarital} marital={marital} data={staticdata.marital_status} />}
                        {/* {console.log("staticdata.marital_status", staticdata && staticdata.marital_status)} */}
                    </TouchableOpacity>
                </View >

                <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Highest Education*</Text>
                <View style={{ paddingLeft: 20, marginTop: 15 }}>

                    <TouchableOpacity >
                        {staticdata && <Education setEducation={setEducation} education={education} data={staticdata.educations} type={"Basic"} />}
                    </TouchableOpacity>
                </View >
                <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}> Occupation*</Text>
                <View style={{ paddingLeft: 20, marginTop: 15 }}>
                    <TouchableOpacity >
                        {staticdata && <ProfileOccupation setJobid={setJobid} jobid={jobid} data={staticdata.jobs} />}
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
                        value={currentposting}
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
                        value={village}
                    />
                </View >
                <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>current_address*</Text>
                <View style={{ paddingLeft: 20 }}>

                    < TextInput
                        style={styles.inputcontainer}
                        placeholder="current_address"
                        autoCapitalize="none"
                        onChangeText={(e) => setAddress(e)}
                        placeholderTextColor="black"
                        value={address}
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
                        value={email}
                    />
                </View >

                <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Facebook id*</Text>
                <View style={{ paddingLeft: 20 }}>

                    < TextInput
                        style={styles.inputcontainer}
                        placeholder="Facebook id"
                        autoCapitalize="none"
                        onChangeText={(e) => setFacebook(e)}
                        placeholderTextColor="black"
                        maxLength={10}
                        value={facebook}
                    />
                </View >
                <View style={{ backgroundColor: "#ffd470", marginTop: 20, margin: 8 }}>
                    <View style={{ backgroundColor: "white", borderWidth: 1, borderColor: "#ffd470", margin: 2, padding: 8 }}>
                        <View style={{ paddingLeft: 20 }}>
                            <Text style={{ fontSize: s(15), color: "black", fontWeight: "400", marginLeft: s(18), marginTop: s(20) }}>Mobile*</Text>
                            < TextInput
                                style={styles.inputcontainer}
                                placeholder="Mobile"
                                autoCapitalize="none"
                                onChangeText={(e) => setContactnumber(e)}
                                placeholderTextColor="black"
                                maxLength={10}
                                value={contactnumber}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: "#ffd470", marginTop: 20, margin: 8 }}>
                    <Text style={{ fontSize: 20, color: "black", textAlign: "center" }}> Address</Text>
                    <View style={{ backgroundColor: "white", borderWidth: 1, borderColor: "#ffd470", margin: 2, padding: 8 }}>
                        {/* <Text style={styles.textcontainer}>State*</Text>
                        <TouchableOpacity style={{ paddingLeft: 20 }}>
                            {state&&  <State setStateid={setStateid} stateid={stateid} data={state.states} />}

                        </TouchableOpacity>
                        <Text style={styles.textcontainer}>District*</Text>
                        <TouchableOpacity style={{ paddingLeft: 20 }}>
                        <Distices setDistrict={setDistrict} district={district} data={state && state.cities[stateid]} stateid={stateid} />
                        </TouchableOpacity> */}



                        <Text style={styles.textcontainer}>Pincode*</Text>
                        <View style={{ paddingLeft: 20 }}>
                            < TextInput
                                style={styles.inputcontainer1}
                                placeholder="Pincode"
                                autoCapitalize="none"
                                onChangeText={(e) => setPincodes(e)}
                                placeholderTextColor="black"
                                maxLength={6}
                                value={pincodes}
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => updatenews()} style={{ justifyContent: "center", alignItems: "center", margin: 40 }}>

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
        // borderRadius: s(8),
        marginTop: 12,
        backgroundColor: "#ffd470",
        borderColor: "#ccc",
        borderRadius: 20,
        height: 50,
        fontSize: 20
    },
    aboutinputcontainer: {
        borderWidth: 1,

        marginTop: 12,
        backgroundColor: "#ffd470",
        borderColor: "#ccc",
        paddingVertical: 40,
        fontSize: 20,
        marginRight: 20,


    },
    inputcontainer1: {
        borderWidth: 1,
        width: "95%",
        borderRadius: s(8),
        marginTop: 12,
        backgroundColor: "#ffd470",
        borderColor: "#ccc",
        borderRadius: 20,
        height: 50,
        fontSize: 20
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
        padding: 10,
        paddingRight: 40,
        backgroundColor: "#ffd470",
        fontSize: 20,
        color: "black"
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
export default Updatecontect