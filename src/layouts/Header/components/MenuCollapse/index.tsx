import React from 'react';
import { useSelector, useDispatch } from '/@/redux';
import { setCollapse } from '/@/redux/modules/user';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const MenuCollapse: React.FC = () => {
  const { collapse } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const click = () => {
    dispatch(setCollapse(!collapse));
  };

  return (
    <div className="text-20px cursor-pointer" onClick={click}>
      {!collapse ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
    </div>
  );
};

export default MenuCollapse;
