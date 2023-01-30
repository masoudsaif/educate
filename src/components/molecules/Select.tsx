import React, { forwardRef, useEffect, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown';

import usePalette from '../../hooks/usePalette';
import { fontSizes } from '../../styles/fonts';
import { Color } from '../../styles/palette';
import { sizes } from '../../styles/sizes';
import Icon, { IIconProps } from '../atoms/Icon';
import Typography from '../atoms/Typography';

export interface ISelectProps extends SelectDropdownProps, ViewStyle {
  variant?: 'outlined' | 'borderless';
  color?: Color;
  focusColor?: Color;
  iconColor?: Color;
  isFocusActive?: boolean;
  isFullWidth?: boolean;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
  marginTop?: number;
  paddingVertical?: number;
  iconProps?: IIconProps;
}

const Select = forwardRef<SelectDropdown, ISelectProps>(
  (
    {
      variant,
      margin,
      marginBottom = sizes.xxs,
      marginEnd,
      marginHorizontal,
      marginLeft,
      marginRight,
      marginStart,
      marginTop,
      marginVertical,
      paddingVertical,
      title,
      data,
      defaultValueByIndex,
      iconColor,
      renderDropdownIcon,
      onFocus,
      onBlur,
      isFullWidth,
      isFocusActive = true,
      elevation,
      iconProps,
      statusBarTranslucent = true,
      fontSize = 'sm',
      borderWidth = variant === 'borderless' ? 0 : sizes.xxs,
      borderRadius = sizes.md,
      dropdownOverlayColor = 'rgba(0, 0, 0, 0)',
      color = 'dark',
      focusColor = 'primary',
      ...props
    },
    ref
  ) => {
    const { palette } = usePalette();
    const { backgroundColor = palette.lightBackground } = props;
    const [value, setValue] = useState(data.length ? defaultValueByIndex : 999);
    const [isFocused, setIsFocused] = useState(false);
    const currentColor = isFocused ? focusColor : color;

    const handleFocus = () => {
      setIsFocused(true);

      if (onFocus) {
        onFocus();
      }
    };

    const handleBlur = () => {
      setIsFocused(false);

      if (onBlur) {
        onBlur();
      }
    };

    const renderIcon = () => (
      <Icon
        name="chevron-down"
        color={iconColor || currentColor}
        {...iconProps}
      />
    );

    useEffect(() => {
      setValue(data.length ? defaultValueByIndex : 999);
    }, [defaultValueByIndex, data]);

    return (
      <View
        style={{
          margin,
          marginBottom,
          marginEnd,
          marginHorizontal,
          marginLeft,
          marginRight,
          marginStart,
          marginTop: (marginTop || 0) + ((title && fontSizes[fontSize]) || 0),
          marginVertical,
        }}
      >
        <SelectDropdown
          ref={ref}
          {...props}
          data={data}
          statusBarTranslucent={statusBarTranslucent}
          defaultValueByIndex={data.length ? value : undefined}
          dropdownOverlayColor={dropdownOverlayColor}
          onFocus={isFocusActive ? handleFocus : onFocus}
          onBlur={isFocusActive ? handleBlur : onBlur}
          buttonStyle={{
            borderWidth,
            borderRadius,
            borderColor: palette[currentColor],
            backgroundColor,
            elevation,
            paddingVertical: (paddingVertical || 0) + ((title && 8) || 0),
            ...(isFullWidth && { width: '100%' }),
            ...props,
          }}
          renderDropdownIcon={renderDropdownIcon || renderIcon}
        />
        {title && (
          <Typography
            position="absolute"
            fontSize={fontSizes[fontSize]}
            top={-fontSizes[fontSize] + 4}
            left={10}
            paddingHorizontal={sizes.sm}
            color={currentColor}
            backgroundColor={backgroundColor}
          >
            {title}
          </Typography>
        )}
      </View>
    );
  }
);

export default Select;
