import React from 'react';
import { Layout } from 'antd';
import LayoutSiderBar from './SiderBar';
import LayoutCenter from './Center';
import LayoutHeader from './Header';
import LayoutTabs from './Tabs';
import LockScreen from './LockScreen';
export const LayoutDefault: React.FC = () => {
  return (
    <>
      <Layout style={{ height: '100%' }}>
        <LayoutSiderBar />
        <Layout>
          <LayoutHeader />
          <LayoutTabs />
          <LayoutCenter />
        </Layout>
      </Layout>
      <LockScreen />
    </>
  );
};

export default LayoutDefault;
