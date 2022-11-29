import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { s } from "react-native-size-matters";
import { useSelector } from "react-redux";
import * as ApisService from "../../providers/apis/apis";
import { ScrollView } from "react-native-gesture-handler";
import * as customvilidation from '../../providers/shared/Validater';

const CreatePost = ({ navigation, route }) => {
    const userData = useSelector(state => state.userData)
    const [image, setImage] = useState(null)
    const [isSelected, setIsSelected] = useState("news")
    const [title, setTitle] = useState()
    const [discription, setDiscription] = useState()
    const [author, setAuthor] = useState()
    const [id, setId] = useState()
  const [errors, setErrors] = useState({});

    const storeData = () => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        let errors = validateForm()
        if (errors == null) {
            publisdata()
        }
        else (
            setErrors(errors)
        )
    }
    const validateForm = () => {
        let errors = {};
        if (customvilidation.isEmpty(image)) {
            errors.image = "image can't be blank"
        }
       if(customvilidation.isEmpty(title)) {
        errors.title = "title can't be blank"
    }
       if(customvilidation.isEmpty(discription)) {
        errors.discription = "discription can't be blank"
    }
       if(customvilidation.isEmpty(author)) {
        errors.author = "author can't be blank"
    }
        console.log('validation errors::::', errors);
        if (customvilidation.isEmpty(errors)) {
            return null;
        } else {
            return errors;
        }
    }
    useEffect(() => {
        if (route && route.params) {
            const { title, description, image, news_type, owner_name, id } = route.params.values
            setTitle(title)
            setDiscription(description)
            setImage({ path: image })
            setAuthor(owner_name)
            setIsSelected(news_type)
            setId(id)
        }
    }, [])
    const publisdata = () => {
        let data = new FormData();
        data.append('image', {
            name: image.modificationDate + '.jpg',
            type: image.mime,
            uri: Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path,
        });
        data.append('user_id', userData.user.id);
        data.append('title', title);
        data.append('description', discription);
        data.append('author', author);
        data.append('news_type', isSelected);
        console.log("data", data)

        console.log("data::::::::::::::::", JSON.stringify(data))

        ApisService.create(data)
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    navigation.navigate("UserNews")
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    const updatenews = () => {
        let data = {
            user_id: userData.user.id,
            title: title,
            description: discription,
            author: author,
            news_type: isSelected,
            id: id
        }
        ApisService.newsupdate(data)
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    navigation.navigate("UserNews")
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
        ApisService.newsupdateimage(data)
            .then(response => {
                console.log("response::::", response)
                if (response.status) {
                    updatenews()
                    // navigation.navigate("AayojanTab")

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
    const handalpublisdata = () => {
        if (route && route.params) {
            updateimage()

        }
        else {
            storeData()
        }

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
                {/* {console.log("image", image)} */}
                <View style={styles.uploadcontern}>
                    <Fontisto name={"upload"} size={s(17)} color="black" />
                    <TouchableOpacity onPress={() => uploaded()}>
                        <Text style={styles.textcontainer}>Upooad pictures (optional) </Text>
                    </TouchableOpacity>
                    {errors && <Text style={{ color: "red" }}> {errors.image}</Text>}
                </View>
                <View style={styles.radiobutton}>
                    <TouchableOpacity onPress={() => setIsSelected("news")} style={{ flexDirection: "row", marginRight: 70 }}>
                        <Fontisto name={"genderless"} size={s(17)} color={`${isSelected == "news" ? "#ffd470" : "black"}`} />
                        <Text style={{ marginLeft: 10, fontSize: 16, color: "black", fontWeight: "500" }}>news</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIsSelected("blog")} style={{ marginLeft: 30, flexDirection: "row" }}>
                        <Fontisto name={"genderless"} size={s(17)} color={`${isSelected !== "news" ? "#ffd470" : "black"}`} />
                        <Text style={{ marginLeft: 10, fontSize: 16, color: "black", fontWeight: "500" }}>blog</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ margin: 10 }}>
                    <Text style={{ marginLeft: 10, fontSize: 17, color: "black", fontWeight: "600" }}>Title*</Text>
                    < TextInput
                        style={styles.inputcontainer}
                        placeholder="Title"
                        autoCapitalize="none"
                        onChangeText={(numeric) => setTitle(numeric)}
                        placeholderTextColor="black"
                        value={title}
                    />
                    {errors && <Text style={{ color: "red" }}> {errors.title}</Text>}

                    <Text style={{ marginLeft: 10, fontSize: 17, color: "black", fontWeight: "600" }}>Description(50-5000 charctors)*</Text>
                    < TextInput
                        style={styles.inputcontainer1}
                        placeholder="Tell us more about this news."
                        autoCapitalize="none"
                        multiline={true}
                        onChangeText={(numeric) => setDiscription(numeric)}
                        placeholderTextColor="black"
                        maxLength={5000}
                        value={discription}
                    />
                    {errors && <Text style={{ color: "red" }}> {errors.discription}</Text>}

                    <Text style={{ marginLeft: 10, fontSize: 17, color: "black", fontWeight: "600" }}>Source</Text>
                    < TextInput
                        style={styles.inputcontainer}
                        placeholder="Source"
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        onChangeText={(numeric) => setAuthor(numeric)}
                        value={author}
                    // placeholderTextColor={"#bbb"}
                    // maxLength={10}
                    />
                    {errors && <Text style={{ color: "red" }}> {errors.author}</Text>}

                </View>
                <TouchableOpacity onPress={() => handalpublisdata()} style={{ alignSelf: "center", marginTop: 22 }}>
                    <Text style={{ fontSize: 18, fontWeight: "500", borderColor: "#ccc", borderWidth: 1, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8, backgroundColor: "#ffd470" }}>PUBLISH</Text>
                </TouchableOpacity>
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
        // paddingHorizontal:15,
        paddingVertical: 50,
        alignSelf: "center",
        borderRadius: s(8),
        backgroundColor: "#ffd470",
        marginTop: 12
    },
    container: {
        flex: 1
    }
})
export default CreatePost