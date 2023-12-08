import { FC } from 'react';
import { Layout, theme } from 'antd';
import MenuCollapse from './components/MenuCollapse';
import UserDropDown from './components/UserDropDowm';
import Fullscreen from './components/Fullscreen';
import Setting from './components/Setting';
import Breadcrumb from './components/Breadcrumb';

export const Header: FC = () => {
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  return (
    <Layout.Header
      style={{ background: colorBgContainer, borderBottom: '1px solid' + colorBorderSecondary }}
      className="px-4">
      <div className="flex justify-between items-center gap-6">
        <div className="flex gap-6 items-center">
          <MenuCollapse />
          <Breadcrumb />
        </div>
        <div className="flex gap-6 items-center">
          <Fullscreen />
          <UserDropDown />
          <Setting />
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
