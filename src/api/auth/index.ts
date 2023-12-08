import { defAxios } from '/@/utils/axios';

import { UserLoginInfoModel, LoginApiParams } from './model';

enum Api {
  LoginApi = '/backend/auth/login',
}

/**
 * @description: user login api
 */
export function loginApi(data: LoginApiParams) {
  return defAxios.post<UserLoginInfoModel>({ url: Api.LoginApi, data });
}
