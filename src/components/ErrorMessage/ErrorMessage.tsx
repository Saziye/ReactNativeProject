import React, {FC} from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Scale, Fonts, Colors} from 'theme';

type IErrorMessage = {
  errorText: string | boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const ErrorMessage: FC<IErrorMessage> = ({errorText, style, textStyle}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.errorText, textStyle]}>{errorText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Scale(4),
    marginBottom: Scale(10),
    marginLeft: Scale(16),
    maxWidth: '80%',
  },
  errorText: {
    // fontFamily: Fonts.Regular,
    fontSize: Scale(13),
    color: Colors.error,
    textAlign: 'left',
  },
});

export default ErrorMessage;
