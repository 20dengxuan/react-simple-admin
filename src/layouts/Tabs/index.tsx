import React, { useEffect, useState } from 'react';
import { theme, Tag, Dropdown } from 'antd';
import { useLocation, RouteObject, useNavigate } from 'react-router-dom';
import { searchRoute } from '/@/utils';
import { routes } from '/@/router/routes';
import { useAliveController } from 'react-activation';
import { setTabs } from '/@/redux/modules/user';
import { useSelector, useDispatch } from '/@/redux';

const Tabs: React.FC = () => {
  const {
    token: { colorBgContainer, colorPrimary, colorBorderSecondary },
  } = theme.useToken();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refresh, drop } = useAliveController();
  const tabs = useSelector((state) => state.user.tabs);
  const [tabList, setTabList] = useState<RouteObject[]>(tabs || []);

  const { pathname } = useLocation();

  const add = (route: RouteObject) => {
    const findRoute = tabList.find((item) => item.path === route.path);
    if (!findRoute) {
      setTabList([...tabList, route]);
    }
  };

  useEffect(() => {
    const route = searchRoute(pathname, routes);
    route && add(route);
  });

  useEffect(() => {
    dispatch(setTabs(tabList));
  });

  const reload = (route: RouteObject) => {
    refresh(route.path);
    setTimeout(() => {
      const el = document.querySelector('.ant-layout-content');
      el?.scrollTo({ left: 0, top: 0 });
    }, 100);
  };

  const remove = (route: RouteObject) => {
    const filterTab = tabList.filter((item) => item.path !== route.path);
    // 删除页面缓存
    drop(route.path);
    setTabList(filterTab);
    if (route.path === pathname) {
      navigate(filterTab[filterTab.length - 1].path);
    }
  };

  const removeLeft = (route: RouteObject) => {
    const curIndex = tabList.findIndex((item) => item.path === route.path);
    const filterTabs = tabList.filter((_item, index) => index >= curIndex);
    setTabList(filterTabs);
    if (!filterTabs.find((item) => item.path === pathname)) {
      navigate(filterTabs[filterTabs.length - 1].path);
    }
  };

  const removeOther = (route: RouteObject) => {
    const filterTab = tabList.filter((item) => item.path === route.path);
    setTabList(filterTab);
    if (route.path !== pathname) {
      navigate(filterTab[filterTab.length - 1].path);
    }
  };

  const removeRight = (route: RouteObject) => {
    const curIndex = tabList.findIndex((item) => item.path === route.path);
    const filterTabs = tabList.filter((_item, index) => index <= curIndex);
    setTabList(filterTabs);
    if (!filterTabs.find((item) => item.path === pathname)) {
      navigate(filterTabs[filterTabs.length - 1].path);
    }
  };

  const jump = (route: RouteObject) => {
    navigate(route.path);
  };

  return (
    <div
      className="p-2 overflow-x-auto flex items-center"
      style={{
        background: colorBgContainer,
        borderBottom: '1px solid' + colorBorderSecondary,
      }}>
      {tabList.map((item) => {
        return (
          <Dropdown
            key={item.path}
            menu={{
              items: [
                {
                  label: '关闭标签页',
                  key: 'remove',
                  disabled: tabList.length <= 1,
                  onClick: () => remove(item),
                },
                {
                  label: '重新加载',
                  key: 'reloadTab',
                  disabled: item.path !== pathname,
                  onClick: () => reload(item),
                },
                {
                  label: '关闭左侧标签页',
                  key: 'removeLeft',
                  disabled: tabList.length <= 1 || item.path === tabList[0].path,
                  onClick: () => removeLeft(item),
                },
                {
                  label: '关闭其他标签页',
                  key: 'removeOther',
                  disabled: tabList.length <= 1,
                  onClick: () => removeOther(item),
                },
                {
                  label: '关闭右侧标签页',
                  key: 'removeRight',
                  disabled: tabList.length <= 1 || item.path === tabList[tabList.length - 1].path,
                  onClick: () => removeRight(item),
                },
              ],
            }}
            trigger={['contextMenu']}>
            <Tag
              className="cursor-pointer"
              color={pathname === item.path ? colorPrimary : ''}
              onClose={() => remove(item)}
              onClick={() => jump(item)}
              closeIcon={tabList.length > 1}>
              {item.title}
            </Tag>
          </Dropdown>
        );
      })}
    </div>
  );
};

export default Tabs;
