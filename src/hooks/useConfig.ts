import { useMemo } from 'react';
import { useSelector } from '/@/redux';

export const useConfig = () => {
  const { weakOrGray, isDark } = useSelector((state) => state.user);

  const isGray = useMemo(() => weakOrGray === 'gray', [weakOrGray]);

  const isWeak = useMemo(() => weakOrGray === 'weak', [weakOrGray]);

  return { isGray, isWeak, isDark };
};
