import { useSelector } from '/@/redux';
import { useEffect } from 'react';
import { theme, ThemeConfig } from 'antd';

export const useTheme = () => {
  const { isDark, weakOrGray } = useSelector((state) => state.user);
  const themeConfig: ThemeConfig = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: '#3F60A1',
    },
  };

  const initTheme = () => {
    // 灰色和弱色切换
    const el = document.documentElement;
    if (!weakOrGray) el.setAttribute('style', '');
    if (weakOrGray === 'weak') el.setAttribute('style', 'filter: invert(80%)');
    if (weakOrGray === 'gray') el.setAttribute('style', 'filter: grayscale(1)');

    let className = el.className.replace('dark', '').replace('light', '');
    className += isDark ? 'dark' : 'light';
    el.setAttribute('class', className);
  };

  useEffect(initTheme, [weakOrGray, isDark]);

  return { themeConfig, initTheme };
};
