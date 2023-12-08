import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from '/@/redux';
import { setLockScreenPassword, logout } from '/@/redux/modules/user';
import { LockOutlined, CloseCircleOutlined, LoginOutlined } from '@ant-design/icons';
import { Input, InputProps, Card, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const LockScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lockScreenPassword, userInfo } = useSelector((state) => state.user);
  const [dateObj, setDateObj] = useState(dayjs());
  const [isInput, setIsInput] = useState(false);
  const [password, setPassword] = useState('');
  const [inputState, setInputState] = useState<InputProps['status']>('');
  const isShow = useMemo(() => !!lockScreenPassword, [lockScreenPassword]);
  const [timing, setTiming] = useState<NodeJS.Timeout>();
  const showInput = () => {
    setIsInput(true);
  };

  const hideInput = () => {
    setIsInput(false);
  };

  const onPressEnter = () => {
    if (lockScreenPassword !== password) {
      return setInputState('error');
    }
    dispatch(setLockScreenPassword(''));
  };

  const goLogin = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    if (isShow && !timing) {
      setTiming(
        setInterval(() => {
          setDateObj(dayjs());
        }, 1000),
      );
    } else {
      setPassword('');
      clearInterval(timing);
    }
  }, [isShow]);

  const Actions = () => {
    return (
      <>
        <Tooltip title="解锁屏幕">
          <LockOutlined onClick={showInput} />
        </Tooltip>
        <Tooltip title="前往登录">
          <LoginOutlined onClick={goLogin} />
        </Tooltip>
      </>
    );
  };

  return (
    isShow && (
      <>
        <Card className="w-screen h-screen fixed inset-0">
          <div className="absolute right-10 top-10">
            <div className="text-40px">{dateObj.format('HH:ss')}</div>
            <div className="text-20px">{dateObj.format('YYYY.MM.DD, dddd')}</div>
          </div>

          <div className="flex flex-col justify-center items-center w-screen h-screen gap-10" onClick={showInput}>
            <img src="/@/assets/logo.png" className="rounded-full w-96px h-96px" alt="" />
            <div className="text-20px font-semibold"> {userInfo?.username || 'admin'} </div>
            {isInput && (
              <Input
                status={inputState}
                className="w-200px"
                placeholder="请输入解屏密码"
                value={password}
                onChange={(v) => {
                  setInputState('');
                  setPassword(v.target.value);
                }}
                onPressEnter={onPressEnter}
              />
            )}
            <div>点击屏幕解锁</div>
          </div>

          <div className="absolute bottom-10 w-screen flex justify-center gap-4 cursor-pointer">
            {!isInput ? (
              <Actions />
            ) : (
              <Tooltip title="取消">
                <CloseCircleOutlined onClick={hideInput} />
              </Tooltip>
            )}
          </div>
        </Card>
      </>
    )
  );
};

export default LockScreen;
