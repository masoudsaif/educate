import React, { FC, memo, MutableRefObject, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ListRenderItemInfo,
  StatusBar,
  useWindowDimensions,
  View,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useDispatch } from 'react-redux';

import { authScreens } from '../../constants/screens';
import splashScreens from '../../constants/splash-screens';
import { INavigationProp } from '../../constants/types';
import usePalette from '../../hooks/usePalette';
import { turnOnSetting } from '../../redux/reducers/settingsSlice';
import { sizes } from '../../styles/sizes';
import Scale from '../atoms/Scale';
import Button from '../molecules/Button';
import CarouselButtons from '../molecules/CarouselButtons';
import SplashScreen, { ISplashScreenProps } from '../molecules/SplashScreen';

const SplashCarousel: FC<INavigationProp> = memo(({ navigation }) => {
  const carouselRef = useRef() as MutableRefObject<
    Carousel<ISplashScreenProps>
  >;
  const dispatch = useDispatch();
  const { palette } = usePalette();
  const { t } = useTranslation('splashScreens');
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const length = splashScreens.length;

  const handleSnap = (i: number) => setActiveIndex(i);

  const handlePress = () => {
    navigation.navigate(authScreens.signUp.name);
    setTimeout(() => dispatch(turnOnSetting('didSplashScreensOpen')), 300);
  };

  const renderItem = ({
    item: { title, description, image },
  }: ListRenderItemInfo<ISplashScreenProps>) => (
    <SplashScreen title={t(title)} description={t(description)} image={image} />
  );

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <StatusBar barStyle="light-content" backgroundColor={palette.primary} />
      <Carousel
        ref={carouselRef}
        data={splashScreens}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={handleSnap}
        renderItem={renderItem}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
      />
      <Pagination
        activeDotIndex={activeIndex}
        dotsLength={length}
        dotStyle={{
          backgroundColor: palette.primary,
        }}
        containerStyle={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
        }}
      />
      <CarouselButtons
        carouselRef={carouselRef}
        activeIndex={activeIndex}
        length={length}
      />
      <Scale
        isScaled={activeIndex + 1 !== length}
        initialValue={0}
        style={{
          position: 'absolute',
          bottom: '20%',
          width: '100%',
        }}
      >
        <Button
          color="primary"
          fontSize="xl"
          paddingHorizontal={sizes['3xl']}
          alignSelf="center"
          title={t('common:get_started')}
          onPress={handlePress}
        />
      </Scale>
    </View>
  );
});

export default SplashCarousel;
