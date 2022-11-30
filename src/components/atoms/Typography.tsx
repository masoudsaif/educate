import React, { FC, memo } from 'react';
import { Animated, Text, TextProps, TextStyle } from 'react-native';

import usePalette from '../../hooks/usePalette';
import {
  fontFamilies,
  FontFamily,
  FontSize,
  fontSizes,
} from '../../styles/fonts';
import { Color } from '../../styles/palette';

export interface ITypographyProps extends TextProps, TextStyle {
  isAnimated?: boolean;
  color?: Color;
  fontFamily?: FontFamily;
  size?: FontSize;
  animatedStyle?: Animated.WithAnimatedObject<TextStyle>;
}

const Typography: FC<ITypographyProps> = memo(
  ({
    isAnimated,
    children,
    style,
    animatedStyle,
    numberOfLines,
    textBreakStrategy,
    color = 'text',
    fontFamily = 'text',
    size = 'md',
    ellipsizeMode = 'tail',
    ...props
  }) => {
    const { palette } = usePalette();
    const inputProps: ITypographyProps = {
      ...props,
      ellipsizeMode,
      numberOfLines,
      textBreakStrategy,
      children,
      style: [
        {
          color: palette[color],
          fontFamily: fontFamilies[fontFamily],
          fontSize: fontSizes[size],
        },
        props,
        style,
      ],
    };

    return isAnimated ? (
      <Animated.Text
        {...inputProps}
        style={[inputProps.style, animatedStyle]}
      />
    ) : (
      <Text {...inputProps} />
    );
  }
);

export default Typography;
