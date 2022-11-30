import React, { FC, useState } from 'react';
import Input, { IInputProps } from './Input';
import CountryFlag from 'react-native-country-flag';
import { TextInput, View } from 'react-native';
import { iconSizes, sizes } from '../../styles/sizes';

interface IMobileInput extends IInputProps {}

const MobileInput: FC<IMobileInput> = (props) => {
  const [dialCode, setDialCode] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => setIsFocused(false);

  return (
    <Input
      {...props}
      startAdornment={
        <View
          style={{
            flexDirection: 'row',
            marginLeft: sizes.md,
            alignItems: 'center',
          }}
        >
          <CountryFlag
            isoCode="us"
            size={iconSizes.sm}
            style={{
              borderRadius: iconSizes.sm,
              width: iconSizes.sm,
              height: iconSizes.sm,
            }}
          />
          <TextInput
            maxLength={3}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ width: 50, marginLeft: sizes.md }}
          />
        </View>
      }
    />
  );
};

export default MobileInput;
