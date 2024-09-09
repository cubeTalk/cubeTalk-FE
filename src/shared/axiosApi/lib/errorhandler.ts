import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const HandleError = (error: AxiosError | Error) => {
  if (error instanceof AxiosError) {
    const { message } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    const { status, statusText } = error.response as AxiosResponse;

    console.error(
      `[AxiosError] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} | ${message}`
    );
  } else {
    console.error(`[Error] | ${error.name} ${error.toString()}`);
  }
};
