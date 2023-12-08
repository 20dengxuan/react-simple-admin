import React from 'react';
import { Switch } from 'antd';
import { setWeakOrGray, toggleTheme } from '/@/redux/modules/user';
import { useDispatch } from '/@/redux';
import { HandlerEnum } from '../enums';

const SwitchItem: React.FC<{ title: string; def: boolean; event: HandlerEnum }> = (props) => {
  const dispatch = useDispatch();

  const handles = (val: boolean) => {
    switch (props.event) {
      case HandlerEnum.DARK:
        dispatch(toggleTheme());
        break;
      case HandlerEnum.GRAY_MODE:
        dispatch(setWeakOrGray(val ? 'gray' : ''));
        break;
      case HandlerEnum.COLOR_WEAK:
        dispatch(setWeakOrGray(val ? 'weak' : ''));
        break;
    }
  };

  return (
    <div className="flex justify-between items-center">
      <label className="dark:text-white">{props.title}</label>
      <Switch onChange={handles} unCheckedChildren="关" checkedChildren="开" checked={props.def} />
    </div>
  );
};

export default SwitchItem;
