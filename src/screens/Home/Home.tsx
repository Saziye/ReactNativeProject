import {Container, Search} from 'components';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { getPopulars } from 'stores/popular';
import {Colors, Fonts, Scale} from 'theme';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getPopulars())
  },[])
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
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentInset={{bottom: 10}}
            contentContainerStyle={styles.scrollViewContent}>
            <Search
              value={searchValue}
              placeholder="Search"
              onChangeText={value => setSearchValue(value)}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  scrollViewContent: {
    flexGrow: 1,
  },
});
