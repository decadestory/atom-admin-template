import axios from 'axios';
import router from '../router'
import Vue from 'vue'


var imgServerUrl = process.env.VUE_APP_FILE_SERVER_URL;
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER_URL;


axios.interceptors.request.use(function (config) {
    var ls = window.sessionStorage.getItem('jwt-token');
    config.headers['Jwt-Token'] = ls;
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if (response.data.Code === 403) {

        if (response.request.responseURL.indexOf('Common/RoleOption') < 0) {
            Vue.prototype.$message.error(response.data.Msg);
        }


        router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath }
        })
    } else if (response.data.Code !== 1) {
        Vue.prototype.$message.error(response.data.Msg);
    }

    return response;
}, function (error) {
    return Promise.reject(error);
});

export const getBaseUrl = params => {
    return axios.defaults.baseURL;
};

export const imgServerHost = params => {
    return imgServerUrl;
};

export const requestLogin = params => {
    var result = axios.post(`/api/Auth/Auth`, params);
    return result;
};

