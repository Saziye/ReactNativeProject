import Icons from 'assets/icons';
import {Input} from 'components';
import React, {FC} from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {Scale, Fonts, Colors} from 'theme';

type ISearch = {
  value: string;
  placeholder: string;
  style?: ViewStyle;
  onChangeText: (text: string) => void;
};

const Search: FC<ISearch> = ({value, placeholder, style, onChangeText}) => {
  const _onChangeText = (e: string) => {
    onChangeText && onChangeText(e);
  };

  return (
    <View style={styles.container}>
      <Input
        containerStyle={[styles.inoutStyle, style]}
        placeholder={placeholder}
        value={value}
        onChangeText={e => _onChangeText(e)}
        RightIcon={Icons.SearchInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inoutStyle: {},
});

export default Search;
