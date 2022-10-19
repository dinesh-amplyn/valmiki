import axios from 'axios';

axios.defaults.baseURL = `http://192.168.29.196/vaivahiki`;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.timeout = (30 * 1000);
function readError(error) {
    console.log('Error from api:::::::::', JSON.stringify(error))
    let message;
    let statusCode = 400;
    let errorMsg = error;
    if (typeof errorMsg === 'undefined') {
        message = "Something went wrong, Please try again.";
    }
    else if (typeof errorMsg === 'object') {
        if (typeof errorMsg.response.data !== 'undefined') {
            message = errorMsg.response.data.message;
        }
        else if (typeof errorMsg.response.message !== 'undefined') {
            message = errorMsg.response.message;
        }
        else if (typeof errorMsg.message !== 'undefined') {
            message = errorMsg.message;
        }
        else if (typeof errorMsg.error !== 'undefined') {
            message = errorMsg.error;
        }
        else {
            message = "Something went wrong, please try again.";
        }
    }
    else {
        message = errorMsg;
    }
    let result = {
        statusCode: (typeof errorMsg.response.status != 'undefined') ? errorMsg.response.status : statusCode,
        message: message
    }
    console.log('final error::::::', result)
    return result;
}
function readResponse(response) {
    const apiType = response.config.method
    if (apiType == 'patch' || apiType == 'delete') {

        return response;
    }
    else {
        return response.data;
    }
}

export const TramConditon = () => {
    return axios.get(`/api/pages?slug=terms-conditions`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const sendOtp = (params) => {
    return axios.post(`/api/send-otp`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const verifyOTP = (params) => {
    return axios.post(`/api/verify-otp`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const create = (params) => {
    
    return axios.post(`/api/news/create`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const listing = (params) => {
    return axios.get(`/api/news/listing`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const newsview = (id) => {
    return axios.get(`/api/news/view/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const sharepost = (params) => {
    return axios.post(`/api/share-post`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const logOut = (params) => {
    return axios.post(`/api/logout`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const feedHistory = (userId,page) => {
    return axios.get(`/api/get-feed-history/${userId}/${page}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const AnnouncementCreate = (params) => {
    return axios.post(`/api/announcements/create`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const announcementsListing = (params) => {
    return axios.get(`/api/announcements/listing`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const CreateReport = (params) => {
    return axios.post(`/api/report`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const newsupdate = (params) => {
    return axios.post(`/api/news/update`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const newsdelete = (params) => {
    return axios.post(`/api/news/delete`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const announcementdeatil = (id) => {
    return axios.get(`/api/announcements/view/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const announcementdelete = (params) => {
    return axios.post(`/api/announcements/delete`,params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const announcementupdate = (params) => {
    return axios.post(`/api/announcements/update`,params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const eventscreate = (params) => {
    return axios.post(`/api/events/create`,params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const eventslisting = (params) => {
    return axios.get(`/api/events/listing`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const eventsdetails = (id) => {
    return axios.get(`/api/events/details/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const eventsdelete = (params) => {
    return axios.post(`/api/events/delete`,params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const eventsupdate = (params) => {
    return axios.post(`/api/events/update`,params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}
export const userslisting = (params) => {
    return axios.get(`/api/users/listing`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}