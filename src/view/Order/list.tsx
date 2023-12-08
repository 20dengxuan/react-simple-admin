import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const OrderList: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      List
      <Button onClick={() => navigate('/order/list/detail')}>detail</Button>
    </div>
  );
};

export default OrderList;
