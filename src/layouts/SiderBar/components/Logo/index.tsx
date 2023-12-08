import React from 'react';
import style from './index.module.less';
import { useSelector } from '/@/redux';

const Logo: React.FC = () => {
  const collapse = useSelector((state) => state.user.collapse);
  return (
    <div className={style['logo']}>
      <img className={style['logo-img']} src="/@/assets/logo.png" />
      {!collapse && <div className={style['logo-title']}>Simple Adimn</div>}
    </div>
  );
};

export default Logo;
