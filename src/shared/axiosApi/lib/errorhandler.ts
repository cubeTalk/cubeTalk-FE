import { AxiosError, AxiosRequestConfig } from "axios";

export const HandleError = (error: AxiosError | Error) => {
  if (error instanceof AxiosError) {
    const { message, code } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    
    // 타임아웃 처리
    if (code === 'ECONNABORTED') {
      console.error(`[AxiosError] ${method?.toUpperCase()} ${url} | Timeout | ${message}`);
      return;
    }

    const status = error.response?.status;
    const statusText = error.response?.statusText || "No Response";

    console.error(
      `[AxiosError] ${method?.toUpperCase()} ${url} | Error ${status || 'Unknown'} ${statusText} | ${message}`
    );
  } else {
    console.error(`[Error] | ${error.name} ${error.toString()}`);
  }
};
