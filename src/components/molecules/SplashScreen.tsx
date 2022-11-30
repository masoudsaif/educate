import React, { FC, memo } from 'react';
import {
  I18nManager,
  Image,
  ImageSourcePropType,
  View,
  ViewProps,
} from 'react-native';
import usePalette from '../../hooks/usePalette';
import Typography from '../atoms/Typography';

export interface ISplashScreenProps extends ViewProps {
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const SplashScreen: FC<ISplashScreenProps> = memo(
  ({ title, description, image, ...props }) => {
    const { palette } = usePalette();

    return (
      <View
        {...props}
        style={[{ backgroundColor: palette.lightBackground }, props.style]}
      >
        <View
          style={{
            alignItems: 'center',
            height: '50%',
            backgroundColor: palette.primary,
          }}
        >
          <Typography
            color="white"
            textTransform="uppercase"
            marginTop="15%"
            marginBottom="10%"
            width="80%"
            size="4xxl"
            textBreakStrategy="balanced"
            fontFamily="primary"
            paddingRight={I18nManager.isRTL ? undefined : '30%'}
            paddingLeft={I18nManager.isRTL ? '30%' : undefined}
            fontWeight="600"
          >
            {title}
          </Typography>
          <Typography
            color="white"
            textBreakStrategy="balanced"
            lineHeight={22}
            width="80%"
            size="xl"
          >
            {description}
          </Typography>
        </View>
        <Image
          source={image}
          resizeMode="contain"
          style={{
            bottom: '25%',
            height: '70%',
            width: '100%',
          }}
        />
      </View>
    );
  }
);

export default SplashScreen;
