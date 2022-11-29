import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Dimensions, TouchableOpacity, TextInput, } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "../screen/home/Home";
import TopTab from "./TopTab";
import CustomDrawer from "./CustomDraw";
import AayojanTab from "../screen/aayojan/AayojanTab";
import UserNews from "../screen/home/UserNews";
import RenderData from "../componet/RenderData";
import AllDetail from "../toptabs/AllDetail";
import ContectList from "../screen/contect/ContectList";
import profiles from "../screen/profiles/profiles"
import CreateProfiles from "../screen/profiles/CreateProfiles";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigation = ({ navigation }) => {
    return (
        <>
            <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} screenOptions={{ drawerStyle: { width: '70%' } }}>
                <Drawer.Screen name="Home"
                    component={Home}
                />
                <Drawer.Screen name="TopTab"
                    component={TopTab}
                />
                <Drawer.Screen name="AayojanTab"
                    component={AayojanTab}
                />
                <Drawer.Screen name="UserNews"
                    component={UserNews}
                />
                <Drawer.Screen name="profiles"
                    component={profiles}
                />
                <Drawer.Screen name="ContectList"
                    component={ContectList}
                />
            </Drawer.Navigator>
        </>
    );
}

export default DrawerNavigation