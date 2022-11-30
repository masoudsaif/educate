import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Input from '../components/molecules/Input';
import MobileInput from '../components/molecules/MobileInput';
import ScreenLayout from '../components/organisms/ScreenLayout';
import { INavigationProp } from '../constants/types';
import usePalette from '../hooks/usePalette';

const SignUpScreen: FC<INavigationProp> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { palette } = usePalette();

  return (
    <ScreenLayout isLight navigation={navigation} title={t('sign_up')}>
      <Input autoComplete="name" placeholder={t('first_name')!} />
      <Input autoComplete="name-family" placeholder={t('last_name')!} />
      <Input
        autoComplete="email"
        keyboardType="email-address"
        placeholder={t('email')!}
      />
      <Input secureTextEntry placeholder={t('password')!} />
      <Input secureTextEntry placeholder={t('confirm_password')!} />
      <MobileInput placeholder={t('mobile_number')!} />
    </ScreenLayout>
  );
};

export default SignUpScreen;
