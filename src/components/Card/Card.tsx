import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {Scale, Fonts, Colors} from 'theme';
import FastImage, {ResizeMode} from 'react-native-fast-image';
import {number} from 'yup';

interface TCard {
  height?: number;
  width?: number | string;
  image?: string;
  background?: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  resizeMode?: ResizeMode;
  borderRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
}

const Card = ({
  image,
  height = Scale(146),
  width = '100%',
  background = Colors.secondary3,
  onPress = () => {},
  containerStyle,
  resizeMode,
  borderRadius = 14,
  borderBottomLeftRadius,
  borderBottomRightRadius,
}: TCard) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: background,
          height,
          width,
          borderRadius,
          borderBottomLeftRadius,
          borderBottomRightRadius,
        },
        style.container,
        containerStyle,
      ]}
      activeOpacity={0.5}
      onPress={onPress}>
      <FastImage
        style={[
          {borderRadius, borderBottomLeftRadius, borderBottomRightRadius},
          style.bgImage,
        ]}
        source={{
          uri: image || '',
        }}
        resizeMode={resizeMode}
      />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    marginBottom: Scale(8),
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  labelText: {
    fontFamily: Fonts.Bold,
    position: 'absolute',
    left: Scale(12),
    right: Scale(12),
    fontSize: Scale(14),
    lineHeight: Scale(18),
    color: Colors.white,
  },
});

export default Card;
