import { I18nManager } from 'react-native';

import {
  findYourCourseImg,
  getCertifiedImg,
  signUpImg,
  startLearningImg,
} from './images';

const splashScreens = [
  {
    title: 'first_title',
    description: 'first_description',
    image: signUpImg,
  },
  {
    title: 'second_title',
    description: 'second_description',
    image: findYourCourseImg,
  },
  {
    title: 'third_title',
    description: 'third_description',
    image: startLearningImg,
  },
  {
    title: 'fourth_title',
    description: 'fourth_description',
    image: getCertifiedImg,
  },
];

export default I18nManager.isRTL ? splashScreens.reverse() : splashScreens;
