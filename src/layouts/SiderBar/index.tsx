import { FC } from 'react';
import { Layout, theme } from 'antd';
import Logo from './components/Logo';
import Menu from './components/Menu';
import { useSelector } from '/@/redux';

export const SiderBar: FC = () => {
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  const collapse = useSelector((state) => state.user.collapse);

  return (
    <Layout.Sider
      style={{ background: colorBgContainer, borderRight: '1px solid' + colorBorderSecondary }}
      collapsed={collapse}>
      <Logo />
      <Menu />
    </Layout.Sider>
  );
};

export default SiderBar;
