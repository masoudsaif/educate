import React, { FC, forwardRef, memo, useState } from 'react';
import {
  Image,
  ImageProps,
  View,
  ViewStyle,
  ViewProps,
  PressableProps,
  Pressable,
  StyleProp,
  GestureResponderEvent,
} from 'react-native';

import usePalette from '../../hooks/usePalette';
import { FontSize } from '../../styles/fonts';
import { Color } from '../../styles/palette';
import { sizes } from '../../styles/sizes';
import Icon, { IIconProps } from '../atoms/Icon';
import Scale, { IScaleProps } from '../atoms/Scale';
import Typography, { ITypographyProps } from '../atoms/Typography';

export interface IIconButtonProps extends ViewProps, ViewStyle {
  isMaterialIcon?: boolean;
  isMaterialCommunityIcon?: boolean;
  isScaleDisabled?: boolean;
  isDisabled?: boolean;
  variant?: 'standard' | 'elevated';
  color?: Color;
  fontColor?: Color;
  fontSize?: FontSize;
  underlayColor?: Color;
  icon?: IIconProps;
  name?: string;
  size?: number;
  title?: string | null;
  titleProps?: ITypographyProps;
  imageProps?: ImageProps;
  scaleProps?: IScaleProps;
  pressableProps?: PressableProps;
  pressableStyle?: StyleProp<ViewStyle>;
  onPressStyle?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressIn?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressOut?: ((event: GestureResponderEvent) => void) | null | undefined;
}

const IconButton: FC<IIconButtonProps> = forwardRef<View, IIconButtonProps>(
  (
    {
      isMaterialIcon,
      isMaterialCommunityIcon,
      isDisabled,
      icon,
      name,
      size,
      title,
      style,
      color,
      fontColor,
      fontSize,
      titleProps,
      imageProps,
      scaleProps,
      pressableProps,
      pressableStyle,
      onPressStyle,
      onPress,
      onPressIn,
      onPressOut,
      isScaleDisabled = false,
      variant = 'standard',
      backgroundColor = 'transparent',
      alignItems = 'center',
      justifyContent = 'center',
      ...props
    },
    ref
  ) => {
    const { palette } = usePalette();
    const [isScaled, setIsScaled] = useState(false);

    const handlePressIn = (event: GestureResponderEvent) => {
      setIsScaled(true);

      if (onPressIn) {
        onPressIn(event);
      }
    };

    const handlePressOut = (event: GestureResponderEvent) => {
      setIsScaled(false);

      if (onPressOut) {
        onPressOut(event);
      }
    };

    const renderContent = () => (
      <View
        {...props}
        ref={ref}
        style={[
          {
            ...(variant === 'elevated' && {
              elevation: sizes.lg,
              shadowRadius: sizes.sm,
              shadowOffset: {
                width: sizes.xl,
                height: sizes.xl,
              },
            }),
            backgroundColor,
            justifyContent,
            alignItems,
          },
          props,
          style,
        ]}
      >
        {(name || icon) && (
          <Icon
            isMaterialIcon={isMaterialIcon}
            isMaterialCommunityIcon={isMaterialCommunityIcon}
            name={name || icon?.name!}
            size={size}
            {...icon}
            color={icon?.color || color}
          />
        )}
        {imageProps && <Image {...imageProps} />}
        {title && (
          <Typography
            textTransform="capitalize"
            size={fontSize}
            {...titleProps}
            style={[
              {
                color: palette[fontColor || color || icon?.color || 'dark'],
              },
              titleProps?.style,
            ]}
          >
            {title}
          </Typography>
        )}
      </View>
    );

    return (
      <Pressable
        disabled={isDisabled}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [pressed && onPressStyle, pressableStyle]}
        {...pressableProps}
      >
        {isScaleDisabled ? (
          renderContent()
        ) : (
          <Scale
            isScaled={isScaled}
            initialValue={1}
            from={1}
            to={1.1}
            {...scaleProps}
          >
            {renderContent()}
          </Scale>
        )}
      </Pressable>
    );
  }
);

export default memo(IconButton);
