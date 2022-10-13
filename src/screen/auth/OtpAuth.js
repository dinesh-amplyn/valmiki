import React, { useState, useEffect } from "react";

import { Alert, NativeSyntheticEvent, StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { s } from "react-native-size-matters";
import * as ApisService from "../../providers/apis/apis";
import { setUserData } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import * as customvilidation from '../../providers/shared/Validater';
const { height, width } = Dimensions.get("window")
const OtpAuth = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const [otp, setOtp] = useState()
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otpForm, setOtpForm] = useState(null);
  const OtpCode = (Code) => {
    setLoading(true)
    let errors = validateForm(Code)
    if (!errors) {
      if (Code == otp) {
        navigation.navigate("Home")
      }
      else {
        alert("worng otp")
      }
      setErrors(null)
    }
    else {
      setErrors(errors)
      setLoading(false)
    }

  }

  const validateForm = (Code) => {

    let errors = null;

    if (customvilidation.isEmpty(Code)) {
      errors = "Please fill all Fields";
    }
    else if (Code.length < 4) {
      errors = "Please fill all Fields";
    }
    if (customvilidation.isEmpty(errors)) {
      return null;
    } else {
      return errors;
    }
  }
  const verifyOTP = () => {
    let data = { mobile: route.params.mobile, otp: otp }
    ApisService.verifyOTP(data)
      .then(response => {
        console.log('response::::', response)
        if (response.status) {
          // (response.data)
          dispatch(setUserData(response.data))
          navigation.navigate("DrawerNavigation")
        }
      }).catch(error => {
        alert(error.message);
      });
  }
  return (
    <View style={styles.maincontener}>
      <Text style={styles.textcontiners}>Verify your mobile number</Text>
      <View style={styles.inercontener}>
        <Text style={styles.textcontiner}> ENTER YOUR OTP CODE</Text>
        <OTPInputView
          style={{ width: '80%', height: 200, color: "red" }}
          pinCount={4}
          onCodeChanged={setOtp}
          autoFocusOnLoad
          placeholderTextColor={"red"}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => OtpCode(code)}

        />
        {errors && <Text style={{ color: "red" }}>{errors.otp}</Text>}

        <TouchableOpacity onPress={() => verifyOTP()}>
          <Text style={styles.buttoncontaner}>VERIFY</Text>
        </TouchableOpacity>
        <View style={styles.rensendcontant}>
          <Text style={styles.sendcontener}>Don't receive the code?</Text>
        </View>
        <TouchableOpacity>
          <Text style={{ alignSelf: "center", paddingVertical: 8, paddingHorizontal: 10, marginTop: 10, borderBottomWidth: 1 }}>RESEND CODE</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 40,
    height: 45
  },
  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  underlineStyleBase: {
    width: s(50),
    height: s(50),
    borderWidth: 0,
    borderBottomWidth: 1,
    margin: 7,
    marginTop: s(70),
    marginLeft: s(30),
    color: "black",
    fontSize: 25
  },
  underlineStyleHighLighted: {
    borderColor: "red",
  },
  buttoncontaner: {
    alignItems: "center",
    alignSelf: "center",
    fontSize: 20,
    borderWidth: 0,
    borderColor: "red",
    paddingHorizontal: s(90),
    paddingVertical: s(8),
    borderRadius: 8,
    backgroundColor: "#ffd470",
    fontWeight: "600"

  },
  maincontener: {
    flex: 1,
    // justifyContent: "center",
    // alignSelf: "center",
    backgroundColor: "#ffd470",
  },
  inercontener: {
    backgroundColor: "#f8ffff",
    position: "absolute",
    bottom: 0,
    width: width,
    height: "65%",
    borderTopLeftRadius: s(100)
  },
  textcontiner: {
    fontSize: 18,
    marginTop: 80,
    marginLeft: s(90),
    color: "black"
  },
  textcontiners: {
    fontSize: 22,
    marginTop: 80,
    marginLeft: s(60),
    color: "black",
  },
  sendcontener: {
    alignSelf: "center",
    marginTop: 8
  },
  rensendcontant: {
    // marginLeft:50
  }

});
export default OtpAuth