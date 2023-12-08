import { RouteObject } from 'react-router-dom';
/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: RouteObject[] = []): RouteObject | undefined => {
  let result: RouteObject | undefined = undefined;
  for (const item of routes) {
    if (item.path === path) return item;
    if (item.children) {
      const res = searchRoute(path, item.children);
      if (res && Object.keys(res).length) result = res;
    }
  }
  return result;
};
