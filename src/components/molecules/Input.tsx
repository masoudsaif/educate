import React, { forwardRef, ReactNode, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TextInputFocusEventData,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import useForwardedRef from '../../hooks/useForwardedRef';
import usePalette from '../../hooks/usePalette';
import { fontFamilies, fontSizes } from '../../styles/fonts';
import { Color } from '../../styles/palette';
import { sizes } from '../../styles/sizes';
import Typography from '../atoms/Typography';
import IconButton, { IIconButtonProps } from './IconButton';

export interface IInputProps extends TextInputProps, ViewStyle {
  disableBorderPlaceholder?: boolean;
  disableAnimation?: boolean;
  animationDuration?: number;
  variant?: 'outlined' | 'standard';
  isFullWidth?: boolean;
  isValidated?: boolean;
  marginTop?: number;
  paddingVertical?: number;
  focusColor?: Color;
  backgroundColor?: Color;
  inputBackgroundColor?: Color;
  color?: Color;
  textColor?: Color;
  fontSize?: 'md' | 'lg' | 'xl';
  startIcon?: IIconButtonProps;
  endIcon?: IIconButtonProps;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

const Input = forwardRef<TextInput, IInputProps>(
  (
    {
      startIcon,
      endIcon,
      startAdornment,
      endAdornment,
      isFullWidth,
      isValidated,
      maxWidth,
      height,
      maxHeight,
      style,
      placeholder,
      disableBorderPlaceholder,
      disableAnimation = disableBorderPlaceholder,
      margin,
      marginBottom,
      marginEnd,
      marginHorizontal,
      marginLeft,
      marginRight,
      marginStart,
      marginTop,
      marginVertical,
      padding,
      paddingBottom,
      paddingEnd,
      paddingHorizontal = sizes.sm,
      paddingLeft,
      paddingRight,
      paddingStart,
      paddingTop,
      paddingVertical,
      elevation,
      editable,
      value,
      animationDuration = 100,
      backgroundColor = 'lightBackground',
      inputBackgroundColor = 'lightBackground',
      textColor = 'text',
      variant = 'outlined',
      width = isFullWidth ? '100%' : undefined,
      flexDirection = 'row',
      alignItems = 'center',
      fontSize = 'lg',
      color = 'dark',
      focusColor = 'primary',
      borderWidth = sizes.xs,
      borderRadius = sizes.md,
      onFocus,
      onBlur,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputRef = useForwardedRef(ref);
    const startContainerWidthRef = useRef<number>();
    const { palette } = usePalette();
    const [isFocused, setIsFocused] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const blurPlaceholderTop = -fontSizes[fontSize] + 26;
    const focusPlaceholderTop = -fontSizes[fontSize] + 6;
    const blurPlaceholderLeft = startContainerWidthRef.current
      ? startContainerWidthRef.current + 5
      : 20;
    const blurPlaceholderFontSize = fontSizes[fontSize];
    const focusPlaceholderFontSize = fontSizes[fontSize] - 4;
    const focusPlaceholderLeft = variant === 'outlined' ? 10 : -3;
    const { current: placeholderTop } = useRef(
      new Animated.Value(blurPlaceholderTop)
    );
    const { current: placeholderLeft } = useRef(
      new Animated.Value(blurPlaceholderLeft)
    );
    const { current: placeholderFontSize } = useRef(
      new Animated.Value(blurPlaceholderFontSize)
    );

    const currentColor = useMemo(() => {
      if (typeof isValidated === 'boolean') {
        if (value?.length) {
          if (isValidated) {
            return 'success';
          } else {
            return 'error';
          }
        }
      }

      return focusColor;
    }, [focusColor, isValidated, value]);

    const currentCondition = useMemo(
      () => isFocused || (!editable && typeof editable === 'boolean'),
      [isFocused, editable]
    );

    const isPlaceholderActive = useMemo(
      () => placeholder && !disableBorderPlaceholder,
      [placeholder, disableBorderPlaceholder]
    );

    const handleFocusClick = () => {
      inputRef.current?.focus();
    };

    const handleChange = (
      e: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
      if (!e.nativeEvent.text) {
        if (!isEmpty) {
          setIsEmpty(true);
        }
      } else {
        if (isEmpty) {
          setIsEmpty(false);
        }
      }

      if (onChange) {
        onChange(e);
      }
    };

    const handleStartContainerLayout = (e: LayoutChangeEvent) => {
      if (!disableAnimation) {
        startContainerWidthRef.current = e.nativeEvent.layout.width;
        placeholderLeft.setValue(startContainerWidthRef.current + 5);
      }
    };

    const handleFocusEffect = () => {
      Animated.timing(placeholderTop, {
        toValue: focusPlaceholderTop,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      Animated.timing(placeholderLeft, {
        toValue: focusPlaceholderLeft,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      Animated.timing(placeholderFontSize, {
        toValue: focusPlaceholderFontSize,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => setIsFocused(true));
    };

    const handleBlurEffect = () => {
      Animated.timing(placeholderTop, {
        toValue: blurPlaceholderTop,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      Animated.timing(placeholderLeft, {
        toValue: blurPlaceholderLeft,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      Animated.timing(placeholderFontSize, {
        toValue: blurPlaceholderFontSize,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => setIsFocused(false));
    };

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (!value?.length && isEmpty) {
        handleFocusEffect();
      } else {
        setIsFocused(true);
      }
      if (onFocus) {
        onFocus(e);
      }
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (!value?.length && isEmpty) {
        handleBlurEffect();
      } else {
        setIsFocused(false);
      }

      if (onBlur) {
        onBlur(e);
      }
    };

    return (
      <TouchableWithoutFeedback onPress={handleFocusClick}>
        <View
          style={[
            props,
            {
              elevation,
              margin,
              marginBottom,
              marginEnd,
              marginHorizontal,
              marginLeft,
              marginRight,
              marginStart,
              marginTop:
                (marginTop || 0) +
                (variant === 'standard' ? sizes.md : 0) +
                ((isPlaceholderActive && fontSizes[fontSize] - 4) || 0),
              marginVertical,
              padding,
              paddingBottom,
              paddingEnd,
              paddingHorizontal,
              paddingLeft,
              paddingRight,
              paddingStart,
              paddingTop,
              paddingVertical:
                (paddingVertical || 0) + ((isPlaceholderActive && 8) || 0),
              flexDirection,
              alignItems,
              width,
              maxWidth,
              height,
              maxHeight,
              borderWidth,
              backgroundColor: palette[backgroundColor],
              borderColor: palette[currentCondition ? currentColor : color],
              borderRadius,
              ...(variant === 'standard' && {
                borderWidth: 0,
                borderRadius: 0,
                borderBottomWidth: borderWidth,
              }),
            },
          ]}
        >
          {isPlaceholderActive && (
            <Typography
              isAnimated
              position="absolute"
              paddingHorizontal={sizes.sm}
              color={currentCondition ? currentColor : color}
              backgroundColor={palette[backgroundColor]}
              animatedStyle={{
                fontSize: placeholderFontSize,
                top: placeholderTop,
                left: placeholderLeft,
              }}
            >
              {placeholder}
            </Typography>
          )}
          {(startAdornment || startIcon) && (
            <View onLayout={handleStartContainerLayout}>
              {startAdornment}
              {startIcon && (
                <IconButton
                  {...startIcon}
                  color={
                    currentCondition ? currentColor : startIcon.color || color
                  }
                  style={[{ paddingHorizontal: sizes.md }, startIcon.style]}
                />
              )}
            </View>
          )}
          <TextInput
            {...props}
            ref={inputRef}
            placeholder={disableBorderPlaceholder ? placeholder : undefined}
            value={value}
            editable={editable}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            style={[
              {
                borderRadius,
                flex: 1,
                paddingVertical: 0,
                opacity: isEmpty ? 0 : 1,
                backgroundColor: palette[inputBackgroundColor],
                paddingLeft: startIcon ? 0 : sizes.sm,
                paddingRight: endIcon ? 0 : sizes.sm,
                fontSize: fontSizes[fontSize],
                color: palette[textColor],
                fontFamily: fontFamilies.text,
              },
              style,
            ]}
          />
          {endIcon && (
            <IconButton
              {...endIcon}
              color={currentCondition ? currentColor : endIcon.color || color}
              style={[{ paddingHorizontal: sizes.md }, endIcon.style]}
            />
          )}
          {endAdornment}
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

export default Input;
