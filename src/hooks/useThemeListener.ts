import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { setTheme } from '../redux/reducers/settingsSlice';
import { settingsState } from '../redux/store';

const useThemeListener = () => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const { theme } = useSelector(settingsState);

  useEffect(() => {
    if (theme !== colorScheme) {
      dispatch(setTheme(colorScheme || theme));
    }
  }, [dispatch, colorScheme, theme]);

  return { theme, colorScheme };
};

export default useThemeListener;
