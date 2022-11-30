import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { FC, memo } from 'react';
import { useSelector } from 'react-redux';

import { authScreens, IScreen, tabScreens } from '../../constants/screens';
import useThemeListener from '../../hooks/useThemeListener';
import { settingsState } from '../../redux/store';
import SplashCarousel from './SplashCarousel';
import TabBar from './TabBar';

const { Navigator, Screen } = createBottomTabNavigator();

const AppNavigator: FC = memo(() => {
  useThemeListener();
  const { didSplashScreensOpen, isAuthScreensActive } =
    useSelector(settingsState);

  const renderScreen = (screen: IScreen, key: string) => (
    <Screen key={key} name={screen.name} component={screen.component} />
  );

  const renderTabScreens = () =>
    Object.entries(tabScreens).map(([key, screen]) =>
      renderScreen(screen, key)
    );

  const renderAuthScreens = () =>
    Object.entries(authScreens).map(([key, screen]) =>
      renderScreen(screen, key)
    );

  const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

  return (
    <NavigationContainer>
      <Navigator
        backBehavior="history"
        tabBar={renderTabBar}
        screenOptions={{
          header: () => null,
        }}
      >
        {!didSplashScreensOpen ? (
          <Screen name="splash" component={SplashCarousel} />
        ) : null}
        {renderTabScreens()}
        {isAuthScreensActive ? renderAuthScreens() : null}
      </Navigator>
    </NavigationContainer>
  );
});

export default AppNavigator;
