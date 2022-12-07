import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type SafeAreaViewProps = {
  style?: ViewStyle;
  disableBottomSafeArea?: boolean;
  disableTopSafeArea?: boolean;
  disableSidesSafeArea?: boolean;
  children?: React.ReactNode;
};

const SafeAreaView = ({
  style,
  disableBottomSafeArea,
  disableTopSafeArea,
  disableSidesSafeArea,
  children,
}: SafeAreaViewProps) => {
  const insets = useSafeAreaInsets();

  const safeAreaConfig: StyleProp<ViewStyle> = {};

  if (!disableBottomSafeArea) {
    safeAreaConfig.paddingBottom = insets.bottom;
  }

  if (!disableTopSafeArea) {
    safeAreaConfig.paddingTop = insets.top;
  }

  if (!disableSidesSafeArea) {
    safeAreaConfig.paddingRight = insets.right;
    safeAreaConfig.paddingLeft = insets.left;
  }

  return <View style={[style, safeAreaConfig]}>{children}</View>;
};

export default SafeAreaView;
