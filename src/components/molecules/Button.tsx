import React, {
  FC,
  Fragment,
  ReactNode,
  useState,
  forwardRef,
  Ref,
} from 'react';
import {
  View,
  Pressable,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
  PressableProps,
  GestureResponderEvent,
} from 'react-native';

import usePalette from '../../hooks/usePalette';
import { FontSize, fontSizes } from '../../styles/fonts';
import { Color } from '../../styles/palette';
import { sizes } from '../../styles/sizes';
import Icon, { IIconProps } from '../atoms/Icon';
import Scale, { IScaleProps } from '../atoms/Scale';
import Typography from '../atoms/Typography';

const getButtonTextColor = (
  variant: ButtonVariant,
  color: Color,
  isDisabled?: boolean | null
): Color => {
  switch (true) {
    case (variant === 'contained' && color === 'light') ||
      (variant === 'outlined' && color === 'light') ||
      color === 'dark' ||
      isDisabled:
      return 'black';
    case variant === 'outlined' || variant === 'text':
      return color;
    default:
      return 'white';
  }
};

export type ButtonVariant = 'contained' | 'text' | 'outlined';

export interface IButtonProps extends ViewProps, ViewStyle {
  ref?: Ref<View>;
  isScaleDisabled?: boolean;
  startIcon?: IIconProps;
  endIcon?: IIconProps;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  fontSize?: FontSize;
  variant?: ButtonVariant;
  title?: string | ReactNode;
  color?: Color;
  scaleProps?: IScaleProps;
  textColor?: Color;
  textStyle?: StyleProp<TextStyle>;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through';
  pressableProps?: PressableProps;
  pressableStyle?: StyleProp<ViewStyle>;
  onPressStyle?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressIn?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressOut?: ((event: GestureResponderEvent) => void) | null | undefined;
}

const Button: FC<IButtonProps> = forwardRef<View, IButtonProps>(
  (
    {
      isScaleDisabled,
      isDisabled,
      startIcon,
      endIcon,
      startAdornment,
      endAdornment,
      title,
      isFullWidth,
      style,
      textStyle,
      textDecorationLine,
      height,
      opacity,
      pressableProps,
      pressableStyle,
      onPressStyle,
      onPress,
      onPressIn,
      onPressOut,
      scaleProps,
      alignSelf = 'flex-start',
      shadowOffset = {
        width: sizes.xl,
        height: sizes.xl,
      },
      shadowRadius = sizes.sm,
      width = isFullWidth ? '100%' : undefined,
      variant = 'contained',
      elevation = variant !== 'text' ? sizes.xs : 0,
      flexDirection = 'row',
      alignItems = 'center',
      justifyContent = 'center',
      fontSize = 'sm',
      color = 'primary',
      textTransform = 'uppercase',
      textColor = getButtonTextColor(variant, color, isDisabled),
      borderWidth = variant === 'outlined' ? sizes.xs : undefined,
      borderRadius = sizes['5xl'],
      paddingVertical = sizes.sm,
      paddingHorizontal = sizes['3xl'],
      ...props
    },
    ref
  ) => {
    const { palette } = usePalette();
    const { shadowColor = palette[color] } = props;
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
      <Fragment>
        {startAdornment}
        {startIcon && (
          <Icon
            {...startIcon}
            color={startIcon?.color || textColor}
            size={startIcon.size || fontSizes.md}
            style={[{ marginRight: sizes.md }, startIcon.style]}
          />
        )}
        {typeof title === 'string' ? (
          <Typography
            textTransform={textTransform}
            textDecorationLine={textDecorationLine}
            fontWeight="700"
            textAlign="center"
            color={textColor}
            fontFamily="text"
            backgroundColor="transparent"
            size={fontSize}
            style={textStyle}
          >
            {title}
          </Typography>
        ) : (
          title
        )}
        {endIcon && (
          <Icon
            {...endIcon}
            color={startIcon?.color || textColor}
            style={[{ marginLeft: sizes.md }, endIcon.style]}
          />
        )}
        {endAdornment}
      </Fragment>
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
        <View
          ref={ref}
          style={[
            {
              width,
              height,
              shadowRadius,
              shadowOffset,
              shadowColor,
              elevation,
              flexDirection,
              justifyContent,
              alignSelf,
              alignItems,
              paddingHorizontal,
              paddingVertical,
              borderWidth,
              borderColor: palette[color],
              borderRadius,
              opacity,
              ...(variant === 'contained' && {
                backgroundColor: palette[color],
              }),
              ...(isDisabled && {
                opacity: 0.3,
                elevation: 0,
                ...(variant !== 'text' && {
                  borderWidth: 1,
                  borderColor: palette.dark,
                }),
              }),
            },
            props,
            style,
          ]}
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
              style={{
                flexDirection,
              }}
            >
              {renderContent()}
            </Scale>
          )}
        </View>
      </Pressable>
    );
  }
);

export default Button;
