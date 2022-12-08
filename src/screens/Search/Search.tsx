import { Container } from 'components';
import React from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import { Scale } from 'theme';

const Search = () => {
  return (
    <Container>
   
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
          
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </Container>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
