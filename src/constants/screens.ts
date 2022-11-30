import { FC } from 'react';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { INavigationProp } from './types';

export interface IScreen {
  name: string;
  component: FC<INavigationProp>;
}

export interface ITabScreen extends IScreen {
  icon: {
    isMaterialCommunityIcon?: boolean;
    isMaterialIcon?: boolean;
    outline: string;
    sharp: string;
  };
}

export const authScreens: { [i: string]: IScreen } = {
  signUp: {
    name: 'sign-up',
    component: SignUpScreen,
  },
  login: {
    name: 'login',
    component: LoginScreen,
  },
};

export const tabScreens: { [i: string]: ITabScreen } = {
  home: {
    name: 'home',
    component: HomeScreen,
    icon: {
      outline: 'home-outline',
      sharp: 'home-sharp',
    },
  },
  favorites: {
    name: 'favorites',
    component: HomeScreen,
    icon: {
      isMaterialIcon: true,
      outline: 'favorite-outline',
      sharp: 'favorite',
    },
  },
  courses: {
    name: 'courses',
    component: HomeScreen,
    icon: {
      outline: 'book-outline',
      sharp: 'book-sharp',
    },
  },
  notifications: {
    name: 'notifications',
    component: HomeScreen,
    icon: {
      outline: 'notifications-outline',
      sharp: 'notifications',
    },
  },
  account: {
    name: 'account',
    component: HomeScreen,
    icon: {
      isMaterialCommunityIcon: true,
      outline: 'account-outline',
      sharp: 'account',
    },
  },
};
