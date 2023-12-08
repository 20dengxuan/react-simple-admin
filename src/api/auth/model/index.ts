/**
 * @description: Get user information return value
 */
export interface UserLoginInfoModel {
  action: string;
  token: string;
  account: string;
  username: string;
  head_portrait_url: string;
  is_super_admin: boolean;
  user_id: number;
  roleList: string[];
}

/**
 * @description: Get user login Params
 */
export interface LoginApiParams {
  account: string;
  password: string;
}
