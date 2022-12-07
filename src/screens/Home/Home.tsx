import {Container, Search} from 'components';
import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Colors, Fonts, Scale} from 'theme';


const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Container>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>What do you want to watch?</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Scale(100)}
          style={{flex: 1}}>
          <Search
            value={searchValue}
            placeholder="Search"
            onChangeText={value => setSearchValue(value)}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerContainer: {
    paddingLeft: Scale(24),
    paddingRight: Scale(24),
    marginBottom: Scale(24),
  },
  headerText: {
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontSize: Scale(18),
    lineHeight: Scale(27),
  },
  searchContainer: {
    // marginHorizontal:Scale(24),
  },
});
