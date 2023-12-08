import React, { useState } from 'react';
import { Drawer, Divider } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { HandlerEnum } from './enums';
import SwitchItem from './components/SwitchItem';
import { useConfig } from '/@/hooks/useConfig';

const Setting: React.FC = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const { isGray, isWeak, isDark } = useConfig();
  return (
    <>
      <SettingOutlined onClick={() => setShow(true)} className="cursor-pointer text-20px" />
      <Drawer onClose={() => setShow(false)} open={isShow} title="设置">
        <Divider>界面显示</Divider>
        <div className="flex flex-col gap-4">
          <SwitchItem title="夜间模式" event={HandlerEnum.DARK} def={isDark} />

          <SwitchItem title="色弱模式" event={HandlerEnum.COLOR_WEAK} def={isWeak} />

          <SwitchItem title="灰色模式" event={HandlerEnum.GRAY_MODE} def={isGray} />
        </div>
      </Drawer>
    </>
  );
};

export default Setting;
