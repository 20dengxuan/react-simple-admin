import { RouteObject } from 'react-router-dom';
import { UserLoginInfoModel } from '/@/api/auth/model';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    userInfo: null as UserLoginInfoModel | null,
    collapse: false,
    isDark: false,
    weakOrGray: '' as 'weak' | 'gray' | '',
    tabs: [] as RouteObject[],
    lockScreenPassword: '',
  },
  reducers: {
    setToken(state, { payload }: PayloadAction<string>) {
      state.token = payload;
    },
    setUserInfo(state, { payload }: PayloadAction<UserLoginInfoModel>) {
      state.userInfo = payload;
    },
    setCollapse(state, { payload }: PayloadAction<boolean>) {
      state.collapse = payload;
    },
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
    setWeakOrGray(state, { payload }: PayloadAction<'weak' | 'gray' | ''>) {
      state.weakOrGray = payload;
    },
    setTabs(state, { payload }: PayloadAction<RouteObject[]>) {
      state.tabs = payload;
    },
    setLockScreenPassword(state, { payload }: PayloadAction<string>) {
      state.lockScreenPassword = payload;
    },
    logout(state) {
      state.token = '';
      state.tabs = [];
      state.userInfo = null;
      state.lockScreenPassword = '';
    },
  },
});

export const {
  setToken,
  setUserInfo,
  setCollapse,
  toggleTheme,
  setWeakOrGray,
  setTabs,
  setLockScreenPassword,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
