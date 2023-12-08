import { lazy } from 'react';
import lazyLoad from '/@/utils/lazyLoad';
import { RouteObject } from 'react-router-dom';
import Layout from '/@/layouts';
import { KeepAlive } from 'react-activation';

const HomePage: RouteObject = {
  element: <Layout />,
  path: '/',
  title: '主页',
  meta: { hideChildrenInMenu: true, replacePath: '/home', icon: 'HomeOutlined' },
  children: [
    {
      path: '/home',
      element: (
        <KeepAlive name="/home" saveScrollPosition="screen">
          {lazyLoad(lazy(() => import('/@/view/home')))}
        </KeepAlive>
      ),
      title: '主页',
      meta: {
        activeMenu: '/',
        icon: 'HomeOutlined',
      },
    },
  ],
};

export default HomePage;
