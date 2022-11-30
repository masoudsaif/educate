import { useNetInfo } from '@react-native-community/netinfo';
import { NavigationProp } from '@react-navigation/native';
import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager, View, ViewProps, ViewStyle } from 'react-native';

import usePalette from '../../hooks/usePalette';
import { FontFamily, FontSize } from '../../styles/fonts';
import { Color } from '../../styles/palette';
import { sizes } from '../../styles/sizes';
import Icon from '../atoms/Icon';
import Typography, { ITypographyProps } from '../atoms/Typography';
import IconButton from '../molecules/IconButton';

export interface IScreenHeaderProps extends ViewProps, ViewStyle {
  title?: string | null;
  color?: Color;
  titleSize?: FontSize;
  titleFontFamily?: FontFamily;
  titleTextTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  navigation?: NavigationProp<any>;
  isBackVisible?: boolean;
  titleProps?: ITypographyProps;
  headerRightChildren?: ReactNode;
}

const ScreenHeader: FC<IScreenHeaderProps> = ({
  title,
  navigation,
  titleProps,
  headerRightChildren,
  titleFontFamily = 'primary',
  titleSize = '3xl',
  titleTextTransform = 'uppercase',
  isBackVisible,
  color = 'text',
  alignItems = 'center',
  justifyContent = 'center',
  paddingVertical = sizes.xl,
  ...props
}) => {
  const { palette } = usePalette();
  const { t } = useTranslation('alert');
  const netInfo = useNetInfo();

  return (
    <View {...props} style={{ backgroundColor: palette.lightBackground }}>
      <View
        style={{
          alignItems,
          justifyContent,
          paddingVertical,
        }}
      >
        {isBackVisible && navigation?.goBack ? (
          <IconButton
            icon={{
              name: 'arrow-back',
              color,
            }}
            style={{
              ...(I18nManager.isRTL && {
                transform: [{ rotateY: '180deg' }],
              }),
            }}
            pressableStyle={{
              position: 'absolute',
              left: 0,
              marginHorizontal: sizes.lg,
            }}
            onPress={navigation.goBack}
          />
        ) : null}
        {title ? (
          <Typography
            fontFamily={titleFontFamily}
            size={titleSize}
            textTransform={titleTextTransform}
            color={color}
            {...titleProps}
          >
            {title}
          </Typography>
        ) : null}
        {headerRightChildren}
      </View>
      {netInfo.type === 'none' && (
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: sizes.lg,
          }}
        >
          <Icon
            isMaterialIcon
            name="wifi-off"
            style={{ marginRight: sizes.sm }}
          />
          <Typography size="sm" color="dark">
            {t('offline')}
          </Typography>
        </View>
      )}
    </View>
  );
};
export default ScreenHeader;
