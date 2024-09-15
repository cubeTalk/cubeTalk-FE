import { AxiosError, AxiosRequestConfig } from "axios";

export const HandleError = (error: AxiosError | Error) => {
  if (error instanceof AxiosError) {
    const { message, code } = error;
    const { method, url } = error.config as AxiosRequestConfig;

    // 타임아웃 처리
    if (code === "ECONNABORTED") {
      console.error(`[AxiosError] ${method?.toUpperCase()} ${url} | Timeout | ${message} | Response ${JSON.stringify(error.response?.data?.data)}`);
      return;
    }

    const status = error.response?.status;
    const statusText = error.response?.data.message;

    console.error(
      `[AxiosError] ${method?.toUpperCase()} ${url} | Error ${status || "Unknown"} ${statusText} | Response ${JSON.stringify(error.response?.data?.data)}`
    );
  } else {
    console.error(`[Error] | ${error.name} ${error.toString()}`);
  }
};
