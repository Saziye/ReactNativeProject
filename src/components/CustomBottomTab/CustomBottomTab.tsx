import React, {FC, useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, SafeAreaView} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Colors, Fonts, Scale} from 'theme';
import routes from 'navigation/RoutePaths';
import Icons from 'assets/icons';

interface ICustomBottomTab extends BottomTabBarProps {}

interface IBottomTabList {
  title: string;
  redirect: string;
  icon: JSX.Element;
}

const CustomBottomTab: FC<ICustomBottomTab> = ({navigation, state}) => {
  const [activeButton, setActiveButton] = useState<string>(routes.home);
  const pageData: Array<IBottomTabList> = [
    {
      title: 'Home',
      redirect: routes.home,
      icon:
        activeButton === routes.home ? (
          <Icons.Home width={Scale(26)} height={Scale(26)} />
        ) : (
          <Icons.HomeDeactive width={Scale(26)} height={Scale(26)} />
        ),
    },
    {
      title: 'Search',
      redirect: routes.search,
      icon:
        activeButton === routes.search ? (
          <Icons.Search width={Scale(26)} height={Scale(26)} />
        ) : (
          <Icons.SearchDeactive width={Scale(26)} height={Scale(26)} />
        ),
    },
    {
      title: 'Sign Up',
      redirect: routes.signup,
      icon:
        activeButton === routes.signup ? (
          <Icons.Watchlist width={Scale(26)} height={Scale(26)} />
        ) : (
          <Icons.WatchlistDeactive width={Scale(26)} height={Scale(26)} />
        ),
    },
  ];
  const data = useMemo(() => pageData, [activeButton]);

  useEffect(() => {
    if (state.index < 3 && state.index > -1) {
      setActiveButton(pageData[state.index].redirect);
    }
  }, [state]);

  return (
    <SafeAreaView style={styles.buttons}>
      {data.map((item: IBottomTabList, i: number) => (
        <TouchableOpacity
          key={i}
          style={styles.button}
          onPress={() => {
            setActiveButton(item?.redirect);
            item?.redirect && navigation.navigate(item?.redirect);
          }}>
          {item.icon}
          <Text
            style={[
              styles.buttonText,
              activeButton === item.redirect && styles.activeButtonText,
            ]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: Scale(24),
    marginVertical: Scale(8),
  },
  buttonText: {
    fontFamily: Fonts.Regular,
    color: Colors.secondary3,
    fontSize: Scale(12),
    lineHeight: Scale(14),
    marginTop: Scale(5),
  },
  activeButtonText: {
    fontFamily: Fonts.Regular,
    color: Colors.primary,
    fontSize: Scale(12),
    lineHeight: Scale(14),
    opacity: 1,
    marginTop: Scale(5),
  },
  buttonIcon: {
    opacity: 0.6,
  },
  activeButtonIcon: {
    opacity: 1,
  },
});

export default CustomBottomTab;
