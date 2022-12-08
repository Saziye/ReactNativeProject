import {Button, Container, Input} from 'components';
import React, {useCallback, useRef} from 'react';
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
import {Scale} from 'theme';
import {Formik, FormikProps} from 'formik';
import {SignUpSchema} from 'validations';
import Icons from 'assets/icons';
import {useFocusEffect} from '@react-navigation/native';

interface IFormikProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  eMail: string;
}

const SignUp = () => {
  const formRef = useRef<FormikProps<IFormikProps>>(null);
  const formikInitialValues: IFormikProps = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    eMail: '',
  };
  const formSubmit = (values: IFormikProps) => {};

  useFocusEffect(
    useCallback(() => {
      formRef.current?.resetForm();
    }, []),
  );

  return (
    <Container>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Formik
          innerRef={formRef}
          initialValues={formikInitialValues}
          validateOnMount
          validationSchema={SignUpSchema}
          onSubmit={formSubmit}>
          {({
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => {
            return (
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Scale(100)}
                style={styles.container}>
                <ScrollView
                  style={styles.container}
                  showsVerticalScrollIndicator={false}
                  contentInset={{bottom: 10}}
                  contentContainerStyle={styles.scrollViewContent}>
                  <View style={styles.container}>
                    <View style={styles.content}>
                      <View style={styles.icon}>
                        <Icons.Popcorn width={Scale(74)} height={Scale(74)} />
                      </View>
                      <Input
                        value={values.firstName}
                        containerStyle={styles.input}
                        onChangeText={handleChange('firstName')}
                        placeholder={'First Name'}
                        handleBlur={handleBlur('firstName')}
                        keyboardType="default"
                        testID="inputFirstName"
                        errorMessage={
                          errors.firstName &&
                          touched.firstName &&
                          errors.firstName
                        }
                      />
                      <Input
                        value={values.lastName}
                        containerStyle={styles.input}
                        onChangeText={handleChange('lastName')}
                        placeholder={'Last Name'}
                        handleBlur={handleBlur('lastName')}
                        keyboardType="default"
                        testID="inputLastName"
                        errorMessage={
                          errors.lastName && touched.lastName && errors.lastName
                        }
                      />
                      <Input
                        value={values.phoneNumber}
                        containerStyle={styles.input}
                        onChangeText={handleChange('phoneNumber')}
                        placeholder={'Phone Number'}
                        handleBlur={handleBlur('phoneNumber')}
                        keyboardType="number-pad"
                        testID="inputPhoneNumber"
                        maxLength={18}
                        errorMessage={
                          errors.phoneNumber &&
                          touched.phoneNumber &&
                          errors.phoneNumber
                        }
                      />
                      <Input
                        value={values.eMail}
                        containerStyle={styles.input}
                        onChangeText={handleChange('eMail')}
                        placeholder={'Mail'}
                        handleBlur={handleBlur('eMail')}
                        keyboardType="ascii-capable"
                        maxLength={40}
                        testID="inputEmail"
                        errorMessage={
                          errors.eMail && touched.eMail && errors.eMail
                        }
                      />
                    </View>
                    <View style={styles.button}>
                      <Button
                        label="Sign Up"
                        onPress={() => {
                          handleSubmit();
                        }}
                      />
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            );
          }}
        </Formik>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: Scale(16),
  },
  input: {
    marginBottom: Scale(10),
  },
  button: {
    justifyContent: 'flex-end',
    marginTop: Scale(6),
    marginHorizontal: Scale(10),
  },
});
