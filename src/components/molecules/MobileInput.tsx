import React, { FC, useState } from 'react';
import Input, { IInputProps } from './Input';
import CountryFlag from 'react-native-country-flag';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { iconSizes, sizes } from '../../styles/sizes';
import countries from '../../constants/countries';
import { fontFamilies, fontSizes } from '../../styles/fonts';
import Select from './Select';
import Typography from '../atoms/Typography';
import usePalette from '../../hooks/usePalette';

interface IMobileInput extends IInputProps {}

const MobileInput: FC<IMobileInput> = ({
  isValidated,
  isFocusedStyled,
  fontSize = 'lg',
  disableAnimation = true,
  fontFamily = 'text',
  keyboardType = 'phone-pad',
  dataDetectorTypes = 'phoneNumber',
  ...props
}) => {
  const { palette } = usePalette();
  const [dialCode, setDialCode] = useState('1');
  const [isFocused, setIsFocused] = useState(false);

  const handleDialCode = (text: string, index: number) => {
    const code = text.substring(0, index);

    if (countries[`+${text.substring(0, index)}`]) {
      setDialCode(text.substring(0, index));
    } else {
    }

    return 0;
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => setIsFocused(false);

  const renderCustomizedRowChild = (selectedItem: string) =>
    selectedItem ? (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: palette.lightBackground,
          flex: 1,
        }}
      >
        {console.log(selectedItem)}
        <CountryFlag
          isoCode={countries[selectedItem].isoCode}
          size={iconSizes.xs}
          style={{
            borderRadius: iconSizes.xs,
            width: iconSizes.xs,
            height: iconSizes.xs,
          }}
        />

        <Typography>{selectedItem}</Typography>
      </View>
    ) : null;

  // const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
  //   const { text } = e.nativeEvent;

  //   if (countries[`+${text.substring(0, 3)}`]) {
  //     setDialCode(text.substring(0, 3));
  //   } else if (countries[`+${text.substring(0, 3)}`]) {
  //   }

  //   if (onChange) {
  //     onChange(e);
  //   }
  // };

  return (
    <Input
      {...props}
      disableAnimation={disableAnimation}
      fontFamily={fontFamily}
      fontSize={fontSize}
      keyboardType={keyboardType}
      dataDetectorTypes={dataDetectorTypes}
      isFocusedStyled={isFocusedStyled || isFocused}
      startAdornment={
        <View
          style={{
            flexDirection: 'row',
            marginLeft: sizes.md,
            alignItems: 'center',
          }}
        >
          {countries[`+${dialCode}`] ? (
            <CountryFlag
              isoCode={'eg'}
              size={iconSizes.xs}
              style={{
                borderRadius: iconSizes.xs,
                width: iconSizes.xs,
                height: iconSizes.xs,
              }}
            />
          ) : (
            <View style={{ width: iconSizes.xs, height: iconSizes.xs }} />
          )}
          <Select
            search
            variant="borderless"
            renderCustomizedRowChild={renderCustomizedRowChild}
            renderCustomizedButtonChild={renderCustomizedRowChild}
            data={Object.keys(countries)}
            width={80}
            height={30}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {/* <TextInput
            keyboardType={keyboardType}
            dataDetectorTypes={dataDetectorTypes}
            value={`+${dialCode}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              marginHorizontal: sizes.sm,
              paddingVertical: 0,
              fontSize: fontSizes[fontSize],
              fontFamily: fontFamilies[fontFamily],
            }}
          /> */}
        </View>
      }
    />
  );
};

export default MobileInput;
