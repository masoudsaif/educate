import React, { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Button from '../components/molecules/Button';
import ScreenLayout from '../components/organisms/ScreenLayout';
import { authScreens } from '../constants/screens';
import { INavigationProp } from '../constants/types';
import usePalette from '../hooks/usePalette';

const LoginScreen: FC<INavigationProp> = ({ navigation }) => {
  const dispatch = useDispatch();
  const t = useTranslation();
  const { palette } = usePalette();

  return (
    <ScreenLayout navigation={navigation} title={'login'}>
      <Button
        title="hello"
        onPress={() => navigation.navigate(authScreens.signUp.name)}
      />
    </ScreenLayout>
  );
};

export default LoginScreen;
