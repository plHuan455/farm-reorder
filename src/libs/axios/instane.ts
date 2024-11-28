import ENVS from '@/constants/envs';
import { LOCAL_STORAGE } from '@/constants/storage';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { logDebug } from './helpers';

const axiosInstance = axios.create({
  baseURL: `${ENVS.API_DOMAIN}/api/v1`,
});

axiosInstance.interceptors.request.use(
  ($config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if ($config.headers) {
      const token = localStorage.getItem(LOCAL_STORAGE.accessToken)
      if (token) {
        $config.headers.Authorization = `Bearer ${token}`;
      }

      logDebug(
        `%c[${$config.method?.toUpperCase()}] -> ${$config.url}:`,
        "background-color: #deeb34; color: #000; font-size: 14px",
        $config.data
      )
      // if ($config.method === 'get') {
      //   $config.params = { ...$config.params, locale: window.localStorage.getItem(LOCAL_STORAGE.LANGUAGE) || 'vi' };
      // }
      // $config.headers['Content-Type'] = 'application/json';
      // $config.headers.Accept = 'application/json';
    }
    return $config;
  },
  async (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    const data = response.data.data
    logDebug(
      `%c[${response.config.method?.toUpperCase()}] -> ${response.config.url}:`,
      "background-color: #23d947; color: #000; font-size: 14px",
      data,
    )
    return data
  },
  async (err: AxiosError): Promise<AxiosError> => {
    const error =  err.response?.data ? (err.response?.data as any)?.errs : err
    if(error?.config) {
      logDebug(
        `%c[${error.config.method?.toUpperCase()}] -> ${error.config.url}:`,
        "background-color: #23d947; color: #000; font-size: 14px",
        error,
      )
    }
    return Promise.reject(err)
  }
);
export default axiosInstance;