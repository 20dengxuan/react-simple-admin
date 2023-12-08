import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import { loginApi } from '/@/api/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '/@/redux';
import { setToken, setUserInfo } from '/@/redux/modules/user';
import './index.less';

type FieldType = {
  account: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (fields: FieldType) => {
    try {
      setLoading(true);
      const res = await loginApi(fields);
      dispatch(setToken(res.token));
      dispatch(setUserInfo(res));
      navigate('/home', { replace: true });
    } catch {
      console.log('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-main">
        <div className="login-banner">
          <img className="w-full" src="/@/assets/login_banner.png" />
        </div>
        <div className="login-form">
          <div className="login-logo">
            <img className="h-56px rounded-6px" src="/@/assets/logo.png" />
            <div className="font-semibold text-xl">Admin</div>
          </div>

          <Form onFinish={handleLogin}>
            <Form.Item<FieldType> name="account">
              <Input className="login-input" placeholder="账号/手机号" />
            </Form.Item>

            <Form.Item<FieldType> name="password">
              <Input className="login-input" placeholder="密码" />
            </Form.Item>

            <div className="mt-6">忘记密码</div>
            <Button className="mt-2 h-48px w-full" type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
