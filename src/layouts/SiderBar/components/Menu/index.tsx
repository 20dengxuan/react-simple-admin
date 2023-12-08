import React, { useState, useEffect } from 'react';
import { Menu as AMenu, MenuProps } from 'antd';
import { routeModuleList } from '/@/router/routes';
import { RouteObject, useLocation, useNavigate } from 'react-router-dom';
import { searchRoute } from '/@/utils/index';
import * as Icons from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

// 动态渲染 Icon 图标
const customIcons: { [key: string]: any } = Icons;

const addIcon = (name: string) => {
  return React.createElement(customIcons[name]);
};

const getMenuList = (routes: RouteObject[]): MenuItem[] => {
  return routes
    .filter((route) => !route.meta?.hideMenu)
    .sort((left, right) => Number(left.meta?.orderNo || 0) - Number(right.meta?.orderNo || 0))
    .map((route) => {
      return {
        icon: route.meta?.icon ? addIcon(route.meta.icon) : undefined,
        key: route.path,
        label: route.title,
        type: '' as 'group',
        children: !route.children || route.meta?.hideChildrenInMenu ? undefined : getMenuList(route.children),
      };
    });
};

const Menu: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [menuList, setMenuList] = useState<MenuItem[]>([]);

  useEffect(() => {
    // 将路由处理成菜单
    setMenuList(getMenuList(routeModuleList));

    // 获取当前路由信息，设置当前选中菜单
    const route = searchRoute(pathname, routeModuleList);
    setSelectedKeys([route?.meta?.activeMenu || pathname || '']);
  }, [pathname]);

  const clickMenu: MenuProps['onClick'] = ({ key }: { key: string }) => {
    const route = searchRoute(key, routeModuleList);
    navigate(route?.meta?.replacePath || key);
  };

  return (
    <AMenu
      className="!border-none"
      items={menuList}
      onClick={clickMenu}
      selectedKeys={selectedKeys}
      mode="inline"></AMenu>
  );
};

export default Menu;
