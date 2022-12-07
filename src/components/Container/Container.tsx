import React, {FC, useCallback} from 'react';
import {Platform, StatusBar, StyleSheet, View, ViewStyle} from 'react-native';
import {SafeAreaView} from 'components';
import {useFocusEffect} from '@react-navigation/native';
import {Colors} from 'theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type TContent = {
  containerStyle?: ViewStyle;
  statusBarColor?: string;
  barStyle?: 'dark-content' | 'light-content';
  hideTopSafeArea?: boolean;
  hideBottomSafeArea?: boolean;
  children: any;
};

const Container: FC<TContent> = ({
  children,
  containerStyle,
  barStyle,
  statusBarColor,
  hideTopSafeArea = true,
  hideBottomSafeArea = true,
}) => {
  const insets = useSafeAreaInsets();
  let _barStyle = barStyle;
  useFocusEffect(
    useCallback(() => {
      if (!!!_barStyle) {
        if (statusBarColor === Colors.white) _barStyle = 'dark-content';
        else _barStyle = 'light-content';
      }
      Platform.OS === 'android' &&
        statusBarColor &&
        StatusBar.setBackgroundColor(statusBarColor);
      StatusBar.setBarStyle(_barStyle);
    }, [barStyle, statusBarColor]),
  );
  return (
    <SafeAreaView
      style={styles.safeArea}
      disableTopSafeArea={hideTopSafeArea}
      disableSidesSafeArea={hideTopSafeArea}
      disableBottomSafeArea={hideBottomSafeArea}>
      <StatusBar barStyle={_barStyle} hidden={Platform.OS === 'android'} />
      <View
        style={[
          styles.container,
          ,
          {
            paddingTop: hideTopSafeArea ? insets.top : 0,
          },
        ]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
});
