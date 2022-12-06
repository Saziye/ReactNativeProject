import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

const guidelineBaseWidth = 320;
const guidelineBaseHeight = 568;
const FACTOR = 0.5;

export const scale = (size: number) =>
  (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = FACTOR) =>
  size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = FACTOR) =>
  size + (verticalScale(size) - size) * factor;

export const HORIZONTAL_GAP = scale(16);
export const BUTTON_BOTTOM_GAP = scale(16);
