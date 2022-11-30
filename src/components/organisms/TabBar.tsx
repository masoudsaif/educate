import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useSelector } from 'react-redux';

import { tabScreens } from '../../constants/screens';
import usePalette from '../../hooks/usePalette';
import { settingsState } from '../../redux/store';
import { sizes } from '../../styles/sizes';
import IconButton from '../molecules/IconButton';

const TabBar: FC<BottomTabBarProps> = memo(
  ({ navigation, state: { index } }) => {
    const { palette } = usePalette();
    const { t } = useTranslation('links');
    const { didSplashScreensOpen, isAuthScreensActive } =
      useSelector(settingsState);

    const renderTabs = () => {
      return Object.entries(tabScreens).map(
        (
          [
            key,
            {
              name,
              icon: { isMaterialCommunityIcon, isMaterialIcon, outline, sharp },
            },
          ],
          i
        ) => (
          <IconButton
            key={key}
            isMaterialIcon={isMaterialIcon}
            isMaterialCommunityIcon={isMaterialCommunityIcon}
            isDisabled={index === i}
            fontSize="xs"
            name={index === i ? sharp : outline}
            title={t(name)}
            color={index === i ? 'primary' : undefined}
            onPress={() => navigation.navigate(name)}
          />
        )
      );
    };

    return (
      <Collapsible collapsed={!didSplashScreensOpen || isAuthScreensActive}>
        <View style={{ backgroundColor: palette.background }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderTopLeftRadius: sizes['8xl'],
              borderTopRightRadius: sizes['8xl'],
              backgroundColor: palette.lightBackground,
              height: 70,
            }}
          >
            {renderTabs()}
          </View>
        </View>
      </Collapsible>
    );
  }
);

export default TabBar;
