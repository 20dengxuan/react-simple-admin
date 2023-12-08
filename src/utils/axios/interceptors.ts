import { isNullOrUnDef } from '/@/utils/is';
import { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import { store } from '/@/redux';

export function reqResolve(config: InternalAxiosRequestConfig) {
  const {
    user: { token },
  } = store.getState();

  // 防止缓存，给get请求加上时间戳
  if (config.method === 'get') {
    config.params = { ...config.params, t: new Date().getTime() };
  }
  config.headers['token'] = token || '';
  return config;
}

export function reqReject(error: any) {
  return Promise.reject(error);
}

export function resResolve(response: AxiosResponse) {
  return response?.data;
}

export function resReject(error: any) {
  let { code, msg } = error.response?.data || {};

  if (isNullOrUnDef(code)) {
    // 未知错误
    code = -1;
    msg = '接口异常！';
  } else {
    /**
     * TODO 此处可以根据后端返回的错误码自定义框架层面的错误处理
     */
    switch (code) {
      case 100078:
        msg = msg || '登录已过期';
        break;
    }
  }
  message.error(msg);
  return Promise.resolve({ code, msg, error });
}
