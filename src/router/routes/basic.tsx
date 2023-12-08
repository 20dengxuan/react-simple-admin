import React from 'react';
import { RouteObject } from 'react-router-dom';
import lazyLoad from '/@/utils/lazyLoad';

export const Login: RouteObject = {
  path: '/login',
  title: '登录',
  element: lazyLoad(React.lazy(() => import('/@/view/login'))),
  meta: {
    ignoreAuth: true,
  },
};

export const ErrorPage: RouteObject = {
  path: '*',
  title: '404',
  element: lazyLoad(React.lazy(() => import('/@/view/ErrorPage'))),
  meta: {
    ignoreAuth: true,
  },
};

export const basicRoutes = [Login, ErrorPage];
