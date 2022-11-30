import { NavigationProp } from '@react-navigation/native';
import React, { FC, ReactNode } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StatusBar,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import usePalette from '../../hooks/usePalette';
import { sizes } from '../../styles/sizes';
import ScreenHeader, { IScreenHeaderProps } from './ScreenHeader';

export interface IScreenLayoutProps {
  children?: ReactNode;
  title?: string | null;
  navigation?: NavigationProp<any>;
  isHeaderVisible?: boolean;
  isBackVisible?: boolean;
  isLight?: boolean;
  screenHeaderProps?: IScreenHeaderProps;
  scrollViewProps?: ScrollViewProps;
  scrollViewStyle?: StyleProp<ViewStyle>;
}

const ScreenLayout: FC<IScreenLayoutProps> = ({
  children,
  title,
  navigation,
  isHeaderVisible,
  isBackVisible,
  isLight,
  screenHeaderProps,
  scrollViewProps,
  scrollViewStyle,
}) => {
  const { theme, palette } = usePalette();

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={palette.lightBackground}
      />
      {title || isHeaderVisible || screenHeaderProps ? (
        <ScreenHeader
          isBackVisible={isBackVisible}
          title={title}
          navigation={navigation}
          {...screenHeaderProps}
        />
      ) : null}
      <ScrollView
        {...scrollViewProps}
        style={[
          {
            backgroundColor:
              palette[isLight ? 'lightBackground' : 'background'],
            height: '100%',
            paddingTop: sizes.xl,
            paddingHorizontal: sizes.xl,
          },
          scrollViewProps?.style,
          scrollViewStyle,
        ]}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenLayout;
