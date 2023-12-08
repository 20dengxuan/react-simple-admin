import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { setLockScreenPassword } from '/@/redux/modules/user';
import { Modal, Input } from 'antd';

export type Instance = { toggleShow: (show: boolean) => void } | undefined;

const LockModal: React.ForwardRefRenderFunction<Instance, {}> = (_props, ref) => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [password, setPassword] = useState('');

  const toggleShow = (show: boolean) => {
    setIsShow(show);
  };

  const onOk = () => {
    dispatch(setLockScreenPassword(password));
    toggleShow(false);
  };

  useImperativeHandle(ref, () => ({
    toggleShow,
  }));

  return (
    <Modal title="锁定屏幕" open={isShow} onCancel={() => toggleShow(false)} onOk={onOk}>
      <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="请输入锁屏密码" />
    </Modal>
  );
};

export default forwardRef(LockModal);
