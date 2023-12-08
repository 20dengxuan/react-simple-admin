import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { resResolve, resReject, reqResolve, reqReject } from './interceptors';
import { Result, UploadFileParams, ContentTypeEnum } from './type';

export class RAxios {
  private axiosInstance: AxiosInstance;

  private defaultOptions: AxiosRequestConfig = {
    baseURL: '/',
    timeout: 30 * 60 * 1000,
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  };

  constructor(options: AxiosRequestConfig = {}) {
    this.axiosInstance = axios.create({ ...this.defaultOptions, ...options });
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(reqResolve, reqReject);
    this.axiosInstance.interceptors.response.use(resResolve, resReject);
  }

  get<T = any>(options: AxiosRequestConfig): Promise<T> {
    return this.request({ ...options, method: 'GET' });
  }

  post<T = any>(options: AxiosRequestConfig): Promise<T> {
    return this.request({ ...options, method: 'POST' });
  }

  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData();
    const customFilename = params.name || 'file';

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    } else {
      formData.append(customFilename, params.file);
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data![key]);
      });
    }

    return this.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    });
  }

  request<T = any>(options: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve) => {
      this.axiosInstance.request<any, AxiosResponse<Result>>({ ...options }).then((res: AxiosResponse<Result>) => {
        resolve(res.data as unknown as Promise<T>);
      });
    });
  }
}
export const defAxios = new RAxios();
