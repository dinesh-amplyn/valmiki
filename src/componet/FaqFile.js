import React, { useState, useEffect } from "react";
import { Alert, NativeSyntheticEvent, StyleSheet, View, TouchableOpacity, Text, FlatList,ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";
import * as ApisService from "../providers/apis/apis";
import HTMLView from 'react-native-htmlview';

const TramConditon = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTramConditon();
    }, []);
    // useLayoutEffect(() => {
    //     setHeader();
    // }, [title])


    const getTramConditon = () => {
        setLoading(true);

        const data = {
            params: {
                slug: 'vaivahiki-faq'
            }
        };
        ApisService.vaivahiki_faq(data)

            .then(response => {
                // console.log('response::::', response.data.description)
                if (response.status) {
                    // setData(response.data.title);

                    setData(response.data.description)
                    setLoading(false);

                }
            }).catch(error => {
                alert(error.message)
                setLoading(false);

            });
    }

    return (
        <SafeAreaView style={styles.maincontainer}>
            <ScrollView>
            {loading &&
                    <View style={styles.loadingMargin}>
                        {/* <OverlaySpinner /> */}
                    </View>
                }
                {!loading &&
            <HTMLView
                value={data}
                stylesheet={styles.inner_messages}
            />
                }
            </ScrollView>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    inner_messages:{
        alignItems:"center",
        textAlign:"center",
    },
    maincontainer:{
        flex:1,
        // margin:10,
        paddingVertical:10,
        paddingHorizontal:10,
        backgroundColor:"#ffd470"
        
    }
    
})
export default TramConditon