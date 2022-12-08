import {all, spawn} from 'redux-saga/effects';
import api from '../services';
//Sagas
import commonSaga from './common/saga';
import popularSaga from './popular/saga';
import nowPlayingSaga from './nowPlaying/saga';
import topRatedSaga from './topRated/saga';
import upcomingSaga from './upcoming/saga';
import movieDetailSaga from './movieDetail/saga';

export default function* rootSaga() {
  yield all([spawn(commonSaga)]);
  yield all([spawn(popularSaga, api)]);
  yield all([spawn(nowPlayingSaga, api)]);
  yield all([spawn(topRatedSaga, api)]);
  yield all([spawn(upcomingSaga, api)]);
  yield all([spawn(movieDetailSaga, api)]);
}
