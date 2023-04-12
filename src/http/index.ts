import axios, { AxiosRequestConfig } from 'axios';

import { IAuthResponse } from 'redux/slices/user/types';

export const API_URL = process.env.REACT_APP_API_URL
    // || 'http://clt.its:5000/api';
console.log(API_URL)

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
    console.log('config', config)
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config;
});

$api.interceptors.response.use((config) => config, async (error) => {
    console.log('error', error)
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('[interceptors] Не авторизован')
        }
    }
    throw error;
});

export default $api;
