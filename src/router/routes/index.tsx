import { RouteObject } from 'react-router-dom';
import { basicRoutes } from './basic';

const modules = import.meta.glob('./modules/**/*.tsx', { eager: true });

export const routeModuleList: RouteObject[] = [];

Object.keys(modules).forEach(async (key) => {
  const mod = (modules as Recordable)[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const routes = [...basicRoutes, ...routeModuleList];
