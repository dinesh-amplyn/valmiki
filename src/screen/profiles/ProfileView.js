import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, ScrollView, View, FlatList, StyleSheet, Text, Alert, Image, Button, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { s } from "react-native-size-matters";
import { useSelector } from "react-redux";
import * as ApisService from "../../providers/apis/apis";
import Entypo from 'react-native-vector-icons/Entypo'

const ProfileView = ({ route, navigation }) => {
    const userData = useSelector(state => state.userData)
    const [data, setData] = useState([])
    const [basic,setBasic]=useState([])
    const [contecte,setContecte]=useState([])
    const { value } = route.params
    useEffect(() => {
        dataview()
    }, []);

    const handaldata = (apidata) => {
        setData(apidata)
        let i = 1
        let j = 1
        let newarr = []
        let newdata = []
        for (var key in apidata.basic) {
            if (apidata.basic.hasOwnProperty(key)) {
                let obj = {
                    id: i,
                    title: key,
                    subtitle: apidata.basic[key]
                }
                newarr.push(obj)
                i=i+1
            }
        }
        for (var key in apidata.contact) {
            if (apidata.contact.hasOwnProperty(key)) {
                let obj = {
                    id: i,
                    title: key,
                    subtitle: apidata.contact[key]
                }
                newdata.push(obj)
                j=j+1
            }
        }
        setBasic(newarr)
        setContecte(newdata)
        console.log('newarr:::::::',newarr)
    }

    const dataview = () => {
        let data = {
            params: {

                profile_id: userData.user.profile_id ? userData.user.profile_id : value.id,
            }
        }
        console.log("data", data)
        ApisService.profile_View(data)
            .then(response => {
                console.log('response::::', response)
                if (response.status) {
                    handaldata(response.data)
                    // setData(response.data)
                    console.log("response.data", response.data)
                }
            }).catch(error => {
                alert(error.message);
            });
    }

    return (
        <View style={styles.cantainer}>
            <ScrollView >

                 <View style={{ borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                <Image
                    style={styles.imagecontener}
                    source={{ uri:data&&data.images&& data.images[1].replace("localhost", "192.168.29.196") }} />
            </View> 
                <View style={styles.textcontener} >
                    {basic.map((item) =>
                        <View style={{ width: "50%", marginTop: 10 }} >
                            <Text style={{ color: "black", fontWeight: "600", fontSize: 18, marginLeft: 20 }}>{item.title}</Text>
                            <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, marginLeft: 20 }}>{item.subtitle}</Text>
                        </View>
                    )}
                </View>
                <View style={styles.textcontener} >
                    {contecte.map((item) =>
                        <View style={{ width: "50%", marginTop: 10 }} >
                            <Text style={{ color: "black", fontWeight: "600", fontSize: 18, marginLeft: 20 }}>{item.title}</Text>
                            <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, marginLeft: 20 }}>{item.subtitle}</Text>
                        </View>
                    )}
                </View>
                {console.log(data.educations)}
                <View style={styles.textcontener} >
                    {data&&data.educations&&data.educations.map((item) =>
                        <View style={{ width: "50%", marginTop: 10 }} >
                            <Text style={{ color: "black", fontWeight: "600", fontSize: 18, marginLeft: 20 }}>education</Text>
                            <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, marginLeft: 20  }}>{item.education}</Text>
                            <Text style={{ color: "black", fontWeight: "600", fontSize: 18, marginLeft: 20 }}>passing_year</Text>
                            <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, marginLeft: 20  }}>{item.passing_year}</Text>
                            <Text style={{ color: "black", fontWeight: "600", fontSize: 18, marginLeft: 20 }}>institute</Text>
                            <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, marginLeft: 20  }}>{item.institute}</Text>
                        </View>
                    )}
                </View>
                <View style={styles.textcontener} >
                    {data&&data.relatives&&data.relatives.map((item) =>
                        <View style={{ width: "50%", marginTop: 10 }} >
                            <Text style={{ color: "black", fontWeight: "600", fontSize: 18, marginLeft: 20 }}>name</Text>
                            <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, marginLeft: 20  }}>{item.name}</Text>
                            <Text style={{ color: "black", fontWeight: "600", fontSize: 18, marginLeft: 20 }}>mobile</Text>
                            <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, marginLeft: 20  }}>{item.mobile}</Text>
                            <Text style={{ color: "black", fontWeight: "600", fontSize: 18, marginLeft: 20 }}>address</Text>
                            <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, marginLeft: 20  }}>{item.address}</Text>
                            <Text style={{ color: "black", fontWeight: "600", fontSize: 18, marginLeft: 20 }}>remark</Text>
                            <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, marginLeft: 20  }}>{item.remark}</Text>
                            <Text style={{ color: "black", fontWeight: "600", fontSize: 18, marginLeft: 20 }}>relation</Text>
                            <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, marginLeft: 20  }}>{item.relation}</Text>
                        </View>
                    )}
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: "#aaa" }} />
                <View style={{ margin: 20 }}>
                    <Text style={{ color: "black", fontWeight: "600", fontSize: 18, }}>Contect Number:</Text>
                    <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, width: "50%" }}>Please use chat system  to know number</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: "#aaa", marginBottom: 70 }} />
            </ScrollView>
           
        </View>

    )
}
const styles = StyleSheet.create({
    cantainer: {
        flex: 1,

    },

    imagecontener: {
        width: "95%",
        height: 250,
        borderRadius: s(10),
    },
    textcontener: {
        flexDirection: "row",
        flexWrap: 'wrap',
        marginLeft: 15,
        marginTop: 15

    },


}
)

export default ProfileView