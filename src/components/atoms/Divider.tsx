import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ViewProps, ViewStyle } from 'react-native';

import usePalette from '../../hooks/usePalette';
import { Color } from '../../styles/palette';
import { styles } from '../../styles/styles';
import Typography from './Typography';

export interface IDividerProps extends ViewProps, ViewStyle {
  variant?: 'default' | 'or';
  color?: Color;
  height?: number;
  fontColor?: Color;
}

const Divider: FC<IDividerProps> = memo(
  ({
    variant = 'default',
    width = '100%',
    color = 'light',
    height = 1,
    flex = 1,
    flexDirection = 'row',
    style,
    ...props
  }) => {
    const { palette } = usePalette();
    const { t } = useTranslation('common');
    const {
      backgroundColor = palette[color],
      borderColor = backgroundColor,
      fontColor = color,
      borderWidth = height,
    } = props;

    return (
      <View
        {...props}
        style={[
          {
            backgroundColor,
            borderColor,
            borderWidth,
            flex,
            width,
            flexDirection,
          },
          props,
          style,
        ]}
      >
        {variant === 'or' && (
          <View
            style={[
              styles.absoluteCenterHorizontal,
              {
                zIndex: 1,
                top: -8,
              },
            ]}
          >
            <Typography
              fontFamily="primary"
              size="lg"
              textAlign="center"
              width={30}
              color={fontColor}
              backgroundColor={palette.background}
            >
              {t('or')}
            </Typography>
          </View>
        )}
      </View>
    );
  }
);

export default Divider;
