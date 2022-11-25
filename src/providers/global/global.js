import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export const setUserInfo = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@user', jsonValue)
  } catch (e) {
    // saving error
  }
}
export const getUserInfo = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    // clear error
    console.log(e);
    return true;
  }
}
export const getCurrentDateTime = (format = 'YYYY/MM/DD') => {

  return moment().format(format)

}
export const formatedDateTime = (datetime, format = 'YYYY-MM-DD HH:mm:ss') => {

  return moment(datetime).format(format)
}