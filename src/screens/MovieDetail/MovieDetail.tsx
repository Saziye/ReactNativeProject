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
import Icons from 'assets/icons';
import {Dimensions} from 'react-native';

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
  const screenWidth = Dimensions.get('screen').width - Scale(40);

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
      data: movieDetail,
    },
    {
      index: 1,
      title: 'Reviews',
      data: movieCredit,
    },
    {
      index: 2,
      title: 'Cast',
      data: movieReviews,
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
            image={
              'https://image.tmdb.org/t/p/original' + movieDetail?.backdrop_path
            }
            height={Scale(210)}
            resizeMode="stretch"
            width={'100%'}
            borderRadius={0}
            borderBottomLeftRadius={16}
            borderBottomRightRadius={16}
          />
        </View>
        <View style={styles.titleContainer}>
          <Card
            image={
              'https://image.tmdb.org/t/p/original' + movieDetail?.poster_path
            }
            height={Scale(120)}
            resizeMode="stretch"
            width={Scale(95)}
            containerStyle={styles.posterCard}
          />
          <View style={styles.posterContainer}></View>
          <View style={styles.taglineContainer}>
            <Text style={styles.tagline}>{movieDetail?.original_title}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Icons.Calendar width={20} height={20} />
            <Text style={styles.infoText}>2021</Text>
          </View>
          <View style={styles.infoItem}>
            <Icons.Time width={20} height={20} />
            <Text style={styles.infoText}>{movieDetail?.runtime}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icons.Ticket width={20} height={20} />
            <Text style={styles.infoText}>{movieDetail?.genres[0].name}</Text>
          </View>
        </View>
        <View>
          <SelectionTab
            data={TabMenu}
            onPress={(element: ActiveTabProps) => setActiveSelection(element)}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          {activeSelection.index == 0 && (
            <>
              <Text style={styles.contentText}>{movieDetail?.overview}</Text>
            </>
          )}
          {activeSelection.index == 1 && (
            <View style={{flexDirection: 'column', flex: 1}}>
              {movieReviews?.results?.map((item: any, index: number) => {
                return (
                  <View style={styles.reviewsContainer}>
                    <View style={styles.reviewIconContainer}>
                      <Icons.Avatar
                        width={44}
                        height={44}
                        style={styles.reviewIcon}
                      />
                    </View>
                    <View style={styles.reviewTextContainer}>
                      <Text style={styles.reviewText}>
                        {item.author_details?.name +
                          ' ' +
                          item.author_details?.surname}
                      </Text>
                      <Text style={styles.reviewText} numberOfLines={4}>
                        {item?.content}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
          {activeSelection.index == 2 && (
            <View style={styles.castContainer}>
              {movieCredit?.cast?.map((item: any, index: number) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      width: screenWidth / 2,
                      alignItems: 'center',
                    }}>
                    <Card
                      image={
                        'https://image.tmdb.org/t/p/original' +
                        item?.profile_path
                      }
                      height={100}
                      width={100}
                      containerStyle={{borderRadius: 100}}
                      resizeMode="stretch"
                    />
                  </View>
                );
              })}
            </View>
          )}
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
    marginTop: Scale(18),
    paddingVertical: Scale(5),
    paddingLeft: Scale(24),
    paddingRight: Scale(24),
    marginBottom: Scale(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  cardITemContainer: {},
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
  titleContainer: {
    flexDirection: 'row',
    marginTop: Scale(12),
  },
  posterCard: {
    position: 'absolute',
    bottom: Scale(-3),
    left: Scale(29),
  },
  posterContainer: {
    flex: 5,
  },
  taglineContainer: {
    flex: 7,
    minHeight: Scale(48),
  },
  tagline: {
    fontFamily: Fonts.Regular,
    color: Colors.white,
    fontSize: 18,
    lineHeight: 27,
    flex: 1,
    marginRight: Scale(29),
  },
  infoContainer: {
    marginTop: Scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Scale(50),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  infoText: {
    color: Colors.secondary4,
    fontSize: 15,
    lineHeight: 18,
    fontFamily: Fonts.Regular,
    marginLeft: Scale(7),
    textAlign: 'center',
  },
  reviewsContainer: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: Scale(12),
  },
  reviewIconContainer: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  reviewIcon: {
    alignSelf: 'flex-end',
    marginRight: 12,
  },
  reviewTextContainer: {
    flex: 7,
    marginRight: 16,
  },
  reviewText: {
    color: Colors.white,
    fontSize: 15,
    lineHeight: 18,
    fontFamily: Fonts.Regular,
  },
  castContainer: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
