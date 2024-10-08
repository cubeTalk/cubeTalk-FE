import axios, { AxiosError } from "axios";
import { HandleError } from "../lib/errorhandler";

export type ServerResponse<T = undefined> = {
  status: string;
  message: string;
  data?: T;
};

export const instance = axios.create({
  timeout: 2000,
  baseURL: import.meta.env.VITE_HTTP,
  maxRedirects: 1,
});

instance.interceptors.request.use(
  (config) => {
    // Todo: 로그인 인증
    config.method = config.method?.toUpperCase();
    return config;
  },
  (error: AxiosError | Error) => {
    // error logging
    if (import.meta.env.DEV) {
      HandleError(error);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError | Error) => {
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
