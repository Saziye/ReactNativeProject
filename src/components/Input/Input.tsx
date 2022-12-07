import React, {useState, useRef, useEffect} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import TextInputMask from 'react-native-mask-input';
import {Scale, Colors, Fonts} from 'theme';
import {ErrorMessage} from 'components';

const AnimatedMaskInput = Animated.createAnimatedComponent(TextInputMask);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export type TInput = {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  inputValueStyle?: StyleProp<TextStyle>;
  placeholder: string;
  value: string;
  RightIcon?: React.FC<SvgProps>;
  RightIconColor?: string;
  onPressRightIcon?: () => void;
  onChangeText: (text: string) => void;
  handleFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  handleBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  hideErrorMessage?: boolean;
  errorMessage?: string | boolean;
  staticPlaceholder?: string;
  mask?: any;
  inputRef?: any;
  suffix?: string;
  textArea?: boolean;
} & TextInputProps;

const Input = ({
  containerStyle,
  inputStyle,
  inputValueStyle,
  placeholder,
  value,
  RightIcon,
  RightIconColor,
  onChangeText,
  handleFocus,
  handleBlur,
  hideErrorMessage,
  errorMessage,
  mask,
  staticPlaceholder = '',
  onPressRightIcon,
  suffix,
  inputRef,
  textArea = false,
  ...props
}: TInput) => {
  const [_isFocused, setIsFocused] = useState(false);
  const placeholderPosition = useRef(new Animated.Value(value ? 1 : 0)).current;
  const staticPlaceholderOpacity = useRef(
    new Animated.Value(value ? 1 : 0),
  ).current;
  let _inputRef = inputRef || useRef<TextInput>(null);

  useEffect(() => {
    if (value === '' && !_isFocused) {
      animatePlaceholder(0);
      animateStaticPlaceholder(0);
    } else {
      animatePlaceholder(1);
      animateStaticPlaceholder(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const _handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (!_isFocused) {
      setIsFocused(true);
      handleFocus && handleFocus(e);
      animatePlaceholder(1);
      animateStaticPlaceholder(1);
    }
  };

  const _handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (_isFocused) {
      setIsFocused(false);
      handleBlur && handleBlur(e);
      if (value === '') {
        animatePlaceholder(0);
        animateStaticPlaceholder(0);
      }
    }
  };

  const animatePlaceholder = (toValue: number) => {
    Animated.timing(placeholderPosition, {
      toValue,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const animateStaticPlaceholder = (toValue: number) => {
    Animated.timing(staticPlaceholderOpacity, {
      toValue,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const getAnimatedStaticPlaceholderStyles = () => {
    return {
      opacity: staticPlaceholderOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      flex: !suffix ? 1 : undefined,
    };
  };

  const getAnimatedPlaceholderStyles = () => {
    return {
      top: placeholderPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [Scale(14), Scale(9)],
      }),
      fontSize: placeholderPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [Scale(16), Scale(11)],
      }),
    };
  };

  const _onChangeText = (e: string) => {
    let inputString = e;

    if (
      (props.keyboardType === 'number-pad' ||
        props.keyboardType === 'numeric') &&
      !mask
    ) {
      inputString = inputString.replace(/[^0-9]/g, '');
    }

    onChangeText && onChangeText(inputString);
  };

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.input,
          inputStyle,
          errorMessage ? styles.inputError : _isFocused && styles.inputFocus,
          {
            height: textArea ? Scale(100) : Scale(52),
            alignItems: textArea ? 'flex-start' : 'center',
            paddingTop: textArea ? Scale(10) : undefined,
          },
        ]}
        activeOpacity={1}
        onPress={() => _inputRef?.current?.focus()}>
        <Animated.Text
          style={[styles.placeholder, getAnimatedPlaceholderStyles()]}>
          {placeholder}
        </Animated.Text>
        {mask ? (
          <AnimatedMaskInput
            ref={_inputRef}
            style={[
              styles.textInput,
              getAnimatedStaticPlaceholderStyles(),
              {paddingTop: Scale(16)},
            ]}
            value={value}
            onChangeText={e => _onChangeText(e)}
            onFocus={e => _handleFocus(e)}
            onBlur={e => {
              _handleBlur(e);
            }}
            returnKeyType="done"
            placeholder={staticPlaceholder}
            mask={mask}
            {...props}
          />
        ) : (
          <AnimatedTextInput
            ref={_inputRef}
            style={[
              styles.textInput,
              getAnimatedStaticPlaceholderStyles(),
              {
                marginTop: textArea ? Scale(15) : undefined,
                paddingTop: textArea ? Scale(0) : Scale(16),
              },
            ]}
            value={value.replace('/[^p{L}p{N}p{P}p{Z}^$\n]/gu', '')}
            onChangeText={e => _onChangeText(e)}
            onFocus={e => _handleFocus(e)}
            onBlur={e => {
              _handleBlur(e);
            }}
            multiline={textArea}
            returnKeyType="done"
            placeholder={staticPlaceholder}
            {...props}
          />
        )}
        {suffix && (value !== '' || _isFocused) ? (
          <Animated.Text
            style={[
              styles.textInput,
              getAnimatedStaticPlaceholderStyles(),
              {
                marginTop: textArea ? Scale(15) : undefined,
                paddingTop: textArea ? Scale(0) : Scale(16),
              },
            ]}>
            {suffix}
          </Animated.Text>
        ) : null}
        {suffix ? <View style={styles.flex} /> : null}
        {RightIcon && (
          <RightIcon
            width={Scale(24)}
            height={Scale(24)}
            fill={RightIconColor}
            onPress={onPressRightIcon}
          />
        )}
      </TouchableOpacity>
      {errorMessage && !hideErrorMessage ? (
        <ErrorMessage
          style={styles.error}
          textStyle={styles.errorText}
          errorText={errorMessage}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: Colors.secondary2,
    marginHorizontal: Scale(24),
    borderRadius: Scale(16),
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Scale(42),
    paddingHorizontal: Scale(24),
    borderRadius: Scale(16),
  },
  inputFocus: {
    backgroundColor: Colors.secondary2,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  inputError: {
    borderColor: Colors.error,
    borderWidth: 1,
    backgroundColor: Colors.secondary2,
  },
  textInput: {
    color: Colors.white,
    fontFamily: Fonts.Light,
    fontSize: Scale(14),
    padding: 0,
  },
  placeholder: {
    position: 'absolute',
    left: Scale(16),
    fontFamily: Fonts.Regular,
    color: Colors.secondary3,
  },
  flex: {flex: 1},
  error: {
    marginLeft: Scale(2),
    marginTop: Scale(6),
  },
  errorText: {
    fontSize: Scale(14),
  },
});

export default Input;
