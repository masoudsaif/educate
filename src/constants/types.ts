import { NavigationProp } from '@react-navigation/native';

export type Theme = 'dark' | 'light';

export interface INavigationProp {
  navigation: NavigationProp<any>;
}

export interface INavigation {
  navigate: (params: { name: string }) => void;
}
