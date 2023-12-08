import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routes } from '/@/router/routes';
import { RouteObject, Link } from 'react-router-dom';
import { cloneDeep } from 'lodash-es';
import { Breadcrumb, BreadcrumbProps } from 'antd';
const BreadcrumbEl: React.FC = () => {
  const { pathname } = useLocation();

  const [matchList, setMatchList] = useState<RouteObject[]>();

  const filterRoute = (path: string, routeList: RouteObject[]) => {
    const match: RouteObject[] = [];
    const findRoute = (routeList: RouteObject[]): RouteObject | undefined => {
      const result = routeList.find((item) => {
        return item.path === path || (item.children && findRoute(item.children));
      });
      if (result) match.unshift(result);
      return result;
    };

    findRoute(cloneDeep(routeList));
    return match;
  };

  const itemRender: BreadcrumbProps['itemRender'] = (item, _params, items) => {
    const last = items.indexOf(item) === items.length - 1;
    return last || (item as RouteObject)?.meta?.replacePath ? (
      <span>{item.title}</span>
    ) : (
      <Link to={item.path as string}>{item.title}</Link>
    );
  };

  useEffect(() => {
    setMatchList(filterRoute(pathname, routes));
  }, [pathname]);

  return <Breadcrumb items={matchList} itemRender={itemRender}></Breadcrumb>;
};

export default BreadcrumbEl;
