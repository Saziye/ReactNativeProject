import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Card, Container, SelectionTab} from 'components';
import {RouteModel} from 'models';
import {navigate} from 'navigation/root';
import routes from 'navigation/RoutePaths';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Scale} from 'theme';
import {NowPlayingModule} from '../../models/NowPlaying';
import {SvgProps} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import React, {FC, useEffect, useState} from 'react';
import {
  getMovieCredit,
  getMovieDetail,
  getMovieReviews,
} from 'stores/movieDetail';
import {RootState} from 'stores';

interface ICampaignDetail
  extends NativeStackScreenProps<RouteModel, 'MovieDetail'> {}
interface ActiveTabProps {
  index: number;
  title: string;
  data?: Array<any>;
  emptyIcon?: FC<SvgProps>;
  emptyMessage?: string;
}
const MovieDetail: FC<ICampaignDetail> = props => {
  const params = props?.route?.params;
  const {movieDetail, movieCredit, movieReviews} = useSelector(
    (state: RootState) => state.movieDetail,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieDetail({id: params.id}));
    dispatch(getMovieCredit({id: params.id}));
    dispatch(getMovieReviews({id: params.id}));
  }, []);
  const TabMenu: Array<ActiveTabProps> = [
    {
      index: 0,
      title: 'About Movie',
    },
    {
      index: 1,
      title: 'Reviews',
    },
    {
      index: 2,
      title: 'Cast',
    },
  ];
  const [activeSelection, setActiveSelection] = useState<ActiveTabProps>(
    TabMenu[0],
  );
  return (
    <Container>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: 10}}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Text
            style={styles.headerText}
            onPress={() => {
              navigate(routes.home);
            }}>
            {'<-'}
          </Text>
          <Text style={styles.headerText}>{params?.title ?? ''}</Text>
          <Text style={styles.headerText}>{'  '}</Text>
        </View>
        <View style={styles.cardITemContainer}>
          <Card
            image={'https://image.tmdb.org/t/p/original' + params.backdrop_path}
            height={Scale(210)}
            resizeMode="stretch"
            width={'90%'}
          />
        </View>
        {/* <View style={styles.headerContainer}>
          <Text style={styles.contentText}>{movieDetail?.id}</Text>
          <Text style={styles.contentText}>{'text1'}</Text>
          <Text style={styles.contentText}>{'text1'}</Text>
        </View> */}
        <SelectionTab
          data={TabMenu}
          onPress={(element: ActiveTabProps) => setActiveSelection(element)}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: Scale(10),
          }}>
          {activeSelection.index == 0 && (
            <>
              <Text style={styles.contentText}>{params.overview}</Text>
            </>
          )}
          {activeSelection.index == 1 && <></>}
          {activeSelection.index == 2 && <></>}
        </View>
      </ScrollView>
    </Container>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingLeft: Scale(24),
    paddingRight: Scale(24),
    marginBottom: Scale(24),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Scale(50),
  },
  headerText: {
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontSize: Scale(18),
    lineHeight: Scale(27),
  },
  contentText: {
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontSize: Scale(12),
    lineHeight: Scale(14),
  },
  scrollViewContent: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  popularList: {flex: 1, flexDirection: 'column', margin: Scale(10)},
  cardITemContainer: {left: '5%'},
  popularListNumber: {
    position: 'absolute',
    left: Scale(0),
    bottom: Scale(-30),
  },
  popularListNumberText: {
    fontFamily: Fonts.SemiBold,
    fontSize: Scale(96),
    lineHeight: Scale(117),
    color: '##242A32',
    textShadowColor: '#0296E5',
    textShadowOffset: {width: Scale(1), height: Scale(1)},
    textShadowRadius: -1,
  },
});
