import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Scale, Colors, Fonts} from 'theme';

type TButton = {
  label: string;
  subLabel?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  disabled?: boolean;
  light?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  subLabelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export type TButtonProps = TButton & TouchableOpacityProps;

const Button = ({
  labelStyle,
  subLabelStyle,
  containerStyle,
  label,
  subLabel,
  leftIcon,
  disabled = false,
  rightIcon,
  light,
  ...props
}: TButtonProps) => {
  const getContainerStyle = () => {
    const background = Colors.primary; // Background Color
    const disabledBgColor = Colors.secondary; // Disable Background Color
    return {
      backgroundColor: light
        ? Colors.white
        : disabled
        ? disabledBgColor
        : background,
      borderColor: light ? Colors.primary : undefined,
      borderWidth: light ? Scale(2) : undefined,
    };
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[getContainerStyle(), style.container, containerStyle]}
      {...props}>
      <View style={style.leftIcon}>{leftIcon}</View>
      <View style={[style.labelWrapper]}>
        <Text
          style={[style.label, light && {color: Colors.primary}, labelStyle]}>
          {label}
        </Text>
        {subLabel && (
          <Text style={[style.subLabel, subLabelStyle]}>{subLabel}</Text>
        )}
      </View>
      <View style={style.rightIcon}>{rightIcon}</View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Scale(4),
    borderRadius: Scale(16),
    height: Scale(48),
  },
  labelWrapper: {flex: 1},
  label: {
    fontFamily: Fonts.Regular,
    color: Colors.white,
    fontSize: Scale(16),
    lineHeight: Scale(20),
    textAlign: 'center',
  },
  subLabel: {
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontSize: Scale(14),
    marginLeft: Scale(5),
    marginTop: Scale(8),
  },
  icon: {
    width: Scale(35),
  },
  leftIcon: {
    width: Scale(35),
    alignItems: 'center',
  },
  rightIcon: {
    width: Scale(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;
