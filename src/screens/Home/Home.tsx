import {Card, Container, Search, SelectionTab} from 'components';
import {PopularModule, NowPlayingModule} from 'models';
import {navigate} from 'navigation/root';
import routes from 'navigation/RoutePaths';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'stores';
import {getPopulars} from 'stores/popular';
import {getNowPlayings} from 'stores/nowPlaying';
import {getTopRateds} from 'stores/topRated';
import {getUpcomings} from 'stores/upcoming';
import {Colors, Fonts, Scale} from 'theme';
import {SvgProps} from 'react-native-svg';

interface ActiveTabProps {
  index: number;
  title: string;
  data?: Array<any>;
  emptyIcon?: FC<SvgProps>;
  emptyMessage?: string;
}

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const {populars} = useSelector((state: RootState) => state.popular);
  const {nowPlayings} = useSelector((state: RootState) => state.nowPlaying);
  const {topRateds} = useSelector((state: RootState) => state.topRated);
  const {upcomings} = useSelector((state: RootState) => state.upcoming);

  const TabMenu: Array<ActiveTabProps> = [
    {
      index: 0,
      title: 'Now playing',
      data: nowPlayings,
    },
    {
      index: 1,
      title: 'Upcoming',
      data: upcomings,
    },
    {
      index: 2,
      title: 'Top rated',
      data: topRateds,
    },
  ];
  const [activeSelection, setActiveSelection] = useState<ActiveTabProps>(
    TabMenu[0],
  );
  console.log({nowPlayings});
  

  useEffect(() => {
    dispatch(getPopulars());
    dispatch(getNowPlayings());
    dispatch(getTopRateds());
    dispatch(getUpcomings());
  }, []);

  const _renderPopularItem = ({item, index}: any) => {
    const onPressCard = (item: PopularModule.Movie) => {
      navigate(routes.movieDetail, item.id);
    };
    return (
      <View style={styles.cardITemContainer}>
        <Card
          onPress={() => onPressCard(item)}
          image={'https://image.tmdb.org/t/p/original' + item.poster_path}
          height={Scale(210)}
          resizeMode="stretch"
          width={Scale(144)}
        />
        <View style={styles.popularListNumber}>
          <Text style={styles.popularListNumberText}>{index + 1}</Text>
        </View>
      </View>
    );
  };

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
            <FlatList
              data={populars}
              keyExtractor={(item, index) => index.toString()}
              renderItem={_renderPopularItem}
              horizontal={true}
              bounces={false}
              showsHorizontalScrollIndicator={true}
              style={styles.popularList}
            />
            <SelectionTab
              data={TabMenu}
              onPress={(element: ActiveTabProps) => setActiveSelection(element)}
            />
            <View style={styles.listContent}>
              {activeSelection.data?.map((item: any, index: number) => {
                const onPressMovie = (item: NowPlayingModule.Movie) => {
                  navigate(routes.movieDetail, item);
                };
                return (
                  <View
                    style={{
                      height: Scale(150),
                      width: Scale(101),
                      marginLeft: Scale(5),
                      marginTop: Scale(1),
                    }}>
                    <Card
                      onPress={() => onPressMovie(item)}
                      image={
                        'https://image.tmdb.org/t/p/original' + item.poster_path
                      }
                      height={Scale(145)}
                      resizeMode="stretch"
                    />
                  </View>
                );
              })}
            </View>
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
  popularList: {flex: 1, flexDirection: 'column', margin: Scale(10)},
  listContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardITemContainer: {marginHorizontal: '2%', position: 'relative'},
  popularListNumber: {
    position: 'absolute',
    left: Scale(0),
    bottom: Scale(-30),
  },
  popularListNumberText: {
    fontFamily: Fonts.SemiBold,
    fontSize: Scale(96),
    lineHeight: Scale(117),
    color: Colors.secondary,
    textShadowColor: Colors.primary,
    textShadowOffset: {width: Scale(1), height: Scale(1)},
    textShadowRadius: -1,
  },
});
