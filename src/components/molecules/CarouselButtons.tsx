import React, { Fragment, MutableRefObject } from 'react';
import { I18nManager, ViewStyle, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { iconSizes, sizes } from '../../styles/sizes';
import Scale from '../atoms/Scale';
import IconButton, { IIconButtonProps } from './IconButton';

export interface ICarouselButtonsProps<T> {
  carouselRef: MutableRefObject<Carousel<T>>;
  activeIndex: number;
  length: number;
  size?: number;
  commonButtonProps?: IIconButtonProps;
  backButtonProps?: IIconButtonProps;
  forwardButtonProps?: IIconButtonProps;
}

const CarouselButtons = <T,>({
  carouselRef,
  activeIndex,
  length,
  commonButtonProps,
  forwardButtonProps,
  backButtonProps,
  size = iconSizes.lg,
}: ICarouselButtonsProps<T>) => {
  const props: IIconButtonProps = {
    isMaterialIcon: true,
    name: 'arrow-back-ios',
    color: 'black',
    marginHorizontal: sizes.xl,
    size,
    ...commonButtonProps,
  };
  const containerStyle: ViewStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  };

  const handleBackward = () => carouselRef.current?.snapToItem(activeIndex - 1);

  const handleForward = () => carouselRef.current?.snapToItem(activeIndex + 1);

  return (
    <Fragment>
      <TouchableWithoutFeedback
        disabled={activeIndex === 0}
        onPress={handleBackward}
      >
        <Scale
          isScaled={activeIndex === 0}
          initialValue={0}
          style={containerStyle}
        >
          <IconButton
            {...props}
            {...backButtonProps}
            onPress={handleBackward}
            style={[
              backButtonProps?.style,
              { transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] },
            ]}
          />
        </Scale>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        disabled={activeIndex + 1 === length}
        onPress={handleForward}
      >
        <Scale
          isScaled={activeIndex + 1 === length}
          style={[containerStyle, { right: 0 }]}
        >
          <IconButton
            {...props}
            {...forwardButtonProps}
            onPress={handleForward}
            style={[
              forwardButtonProps?.style,
              {
                transform: [{ scaleX: I18nManager.isRTL ? 1 : -1 }],
              },
            ]}
          />
        </Scale>
      </TouchableWithoutFeedback>
    </Fragment>
  );
};

export default CarouselButtons;
