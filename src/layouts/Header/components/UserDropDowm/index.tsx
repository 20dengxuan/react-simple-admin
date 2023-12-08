import React, { useRef } from 'react';
import { Dropdown } from 'antd';
import { useDispatch, useSelector } from '/@/redux';
import type { MenuProps } from 'antd';
import { LogoutOutlined, LockOutlined } from '@ant-design/icons';
import { logout } from '/@/redux/modules/user';
import { useNavigate } from 'react-router-dom';
import LockModal, { Instance } from './components/LockModal';

const UserDropDown: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.user.userInfo?.username);

  const ref = useRef<Instance>();

  const items: MenuProps['items'] = [
    {
      key: 'Lock',
      label: '锁定屏幕',
      icon: <LockOutlined />,
      onClick: () => {
        ref.current?.toggleShow(true);
      },
    },
    {
      key: 'Logout',
      label: '退出系统',
      icon: <LogoutOutlined />,
      onClick: () => {
        dispatch(logout());
        navigate('/login');
      },
    },
  ];

  return (
    <div>
      <Dropdown menu={{ items }}>
        <div className="flex items-center gap-2 cursor-pointer">
          <img className="h-36px w-36px rounded-full" src="/@/assets/logo.png" alt="" />
          {userName}
        </div>
      </Dropdown>
      <LockModal ref={ref}></LockModal>
    </div>
  );
};

export default UserDropDown;
