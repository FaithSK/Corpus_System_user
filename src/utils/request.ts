import axios from 'axios';
import { ElMessage, ElMessageBox, ElNotification  } from 'element-plus';
import { Session } from './storage';
import qs from 'qs';
import router from "@/router";

// 配置新建一个 axios 实例
const service = axios.create({
    // baseURL: baseUrl,
    baseURL: 'http://localhost:8080',
    timeout: 50000,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
    paramsSerializer: {
        serialize(params) {
            return qs.stringify(params, { allowDots: true });
        },
    },
});

// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么 token
        if (Session.get('token')) {
            config.headers!['Authorization'] = `${Session.get('token')}`;
        }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        const res = response.data
        if (res.status === undefined || res.status === 200) {
            return response.data
        } else {
            ElNotification({
                type: 'error',
                title: 'Error',
                message: res.message,
                offset: 100,
            })
            return Promise.reject(service.interceptors.response);
        }
        // if (res.code && res.code !== 0) {
        //     // `token` 过期或者账号已在别处登录
        //     if (res.code === 401 || res.code === 4001) {
        //         Session.clear(); // 清除浏览器全部临时缓存
        //         window.location.href = '/'; // 去登录页
        //         ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
        //             .then(() => {})
        //             .catch(() => {});
        //     }
        //     return Promise.reject(service.interceptors.response);
        // } else {
        //     return response.data;
        // }
    },
    (error) => {
        ElNotification({
            type: 'error',
            title: 'Error',
            message: error,
            offset: 100,
        })
        return Promise.reject(error);
    }
);

// 导出 axios 实例
export default service;
