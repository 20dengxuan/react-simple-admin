import React, { Suspense } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const Center: React.FC = () => {
  return (
    <Layout.Content className="overflow-auto h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Layout.Content>
  );
};

export default Center;
