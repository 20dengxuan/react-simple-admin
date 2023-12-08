import { lazy } from 'react';
import lazyLoad from '/@/utils/lazyLoad';
import { RouteObject } from 'react-router-dom';
import Layout from '/@/layouts';

const Order: RouteObject = {
  element: <Layout />,
  title: '订单管理',
  path: '/order',
  meta: {
    icon: 'MoneyCollectOutlined',
    replacePath: '/order/list',
  },
  children: [
    {
      path: '/order/list',
      element: lazyLoad(lazy(() => import('/@/view/Order/list'))),
      title: '订单列表',
      meta: {
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: '/order/list/detail',
          element: lazyLoad(lazy(() => import('/@/view/Order/detail'))),
          title: '订单详情',
          meta: {
            activeMenu: '/order/list',
          },
        },
      ],
    },
    {
      path: '/order/setting',
      element: lazyLoad(lazy(() => import('/@/view/Order/setting'))),
      title: '订单配置',
    },
  ],
};

export default Order;
