import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const instance = axios.create({
  timeout:1000,
})

instance.interceptors.request.use(
  (config) => {
    // Todo: 로그인 인증
    return config;
  }, (error: AxiosError | Error) => {
    // error logging
    if (import.meta.env.DEV) {
      HandleError(error);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  }, (error: AxiosError | Error) => {
    if (error instanceof AxiosError && error.response?.status === 403) {
      // Todo: refresh logic
      return;
    }

    // error logging
    if (import.meta.env.DEV) {
      HandleError(error);
    }
    return Promise.reject(error);
  }
);

const HandleError = (error: AxiosError | Error) => {
  if (error instanceof AxiosError) {
    const { message } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    const { status, statusText } = error.response as AxiosResponse;
  
    console.error(`[AxiosError] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} | ${message}`);
  } else {
    console.error(`[Error] | ${error.name} ${error.toString()}`);
  }

}