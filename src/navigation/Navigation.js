import React, { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import LoginAuth from '../screen/auth/LoginAuth';
import OtpAuth from '../screen/auth/OtpAuth';
import TramConditon from '../screen/tram&condiction/TramConditon';
import CreatePost from '../screen/home/CreatePost';
import Home from '../screen/home/Home';
import { getUserInfo } from '../providers/global/global';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/slices/userSlice';
import SplashScreen from 'react-native-splash-screen';
import NewsDatile from '../screen/home/NewsDatile';
import BottomTab from './BottomTab';
import UserNews from '../screen/home/UserNews';
import DetailPage from '../toptabs/DetailPage';
import AayojanTab from '../screen/aayojan/AayojanTab';
import AayojanPage from '../screen/aayojan/AayojanPage';
import Report from '../componet/Report';
import AllDetail from '../toptabs/AllDetail';
import EventDatile from '../screen/aayojan/EventDatile';
import ContectList from '../screen/contect/ContectList';
import FaqFile from "../componet/FaqFile"
import ContectView from '../screen/contect/ContectView';
import profiles from "../screen/profiles/profiles"
import CreateProfiles from '../screen/profiles/CreateProfiles';
import ProfileView from '../screen/profiles/ProfileView';
import ProfileBasic from '../componet/profile/ProfileBasic';
import Contectlisting from '../screen/contect/Contectlisting';
import Updatecontect from "../screen/contect/Updatecontect"
import UplodeImage from '../componet/profile/UplodeImage';
import Feedback from '../screen/feedback/Feedback';
import Myinformation from '../screen/contect/Myinformation';
import Setting from '../screen/settings/Setting';
import GetNotification from '../screen/settings/GetNotification';
const Stack = createStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch()

  const [InitialRouteName, setInitialRouteName] = useState("LoginAuth");
  const [loding, setLoding] = useState(true);
  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    const data = await getUserInfo()
    if (data && data.token) {
      setInitialRouteName("DrawerNavigation")
      dispatch(setUserData(data))
      setLoding(false)
      SplashScreen.hide();
    }
    else {
      setLoding(false)
      SplashScreen.hide();
      setInitialRouteName("LoginAuth")
    }
  }
  return (
    <>
      {!loding &&
        <NavigationContainer>
          <Stack.Navigator initialRouteName={InitialRouteName}>
            <Stack.Screen name="LoginAuth" component={LoginAuth} options={{ headerShown: false }} />
            <Stack.Screen name="OtpAuth" component={OtpAuth} options={{ headerShown: false }} />
            <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="TramConditon" component={TramConditon} options={{ headerShown: false }} />
            <Stack.Screen name="CreatePost" component={CreatePost} options={{ headerShown: false }} />
            <Stack.Screen name="NewsDatile" component={NewsDatile}  />
            <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
            <Stack.Screen name="UserNews" component={UserNews} />
            <Stack.Screen name="DetailPage" component={DetailPage}  />
            <Stack.Screen name="Report" component={Report}  />
            <Stack.Screen name="AayojanTab" component={AayojanTab} />
            <Stack.Screen name="AllDetail" component={AllDetail} />
            <Stack.Screen name="EventDatile" component={EventDatile} />
            <Stack.Screen name="AayojanPage" component={AayojanPage} />
            <Stack.Screen name="ContectList" component={ContectList} />
            <Stack.Screen name="FaqFile" component={FaqFile} />
            <Stack.Screen name="ContectView" component={ContectView} />
            <Stack.Screen name="profiles" component={profiles} />
            <Stack.Screen name="ProfileView" component={ProfileView} />
            <Stack.Screen name="CreateProfiles" component={CreateProfiles} />
            <Stack.Screen name="ProfileBasic" component={ProfileBasic} />
            <Stack.Screen name="Contectlisting" component={Contectlisting} />
            <Stack.Screen name="Updatecontect" component={Updatecontect} />
            <Stack.Screen name="UplodeImage" component={UplodeImage} />
            <Stack.Screen name="Feedback" component={Feedback} />
            <Stack.Screen name="Myinformation" component={Myinformation} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="GetNotification" component={GetNotification} />
            
            <Stack.Screen name="Home" component={Home} options={{
              headerStyle: {
                backgroundColor: '#ffd470',
              }
            }} />

          </Stack.Navigator>
        </NavigationContainer>
      }
    </>
  )
}

export default Navigation