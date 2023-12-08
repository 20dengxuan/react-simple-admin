import { useRoutes, NonIndexRouteObject } from 'react-router-dom';

import { routes } from './routes';

import { RouteObject } from 'react-router-dom';

import { cloneDeep } from 'lodash-es';

// 路由扁平化处理
const flatten = (routes: RouteObject[]): RouteObject[] => {
  routes = cloneDeep(routes);
  return routes.reduce((result, item) => {
    result = result.concat(item, Array.isArray(item.children) ? flatten(item.children) : []);
    item.children = undefined;
    return result;
  }, [] as RouteObject[]);
};

// 所有二级路由以下的路由全部转化成二级路由
const randerRouter = routes.map((item) => {
  return {
    ...item,
    children: item?.children ? flatten(item.children) : undefined,
  };
});

const RouterView = () => useRoutes(randerRouter as NonIndexRouteObject[]);

export default RouterView;
