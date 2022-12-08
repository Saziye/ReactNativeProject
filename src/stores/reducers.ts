import {combineReducers} from 'redux';
import {commonSlice} from './common';
import {toastSlice} from './toast';
import {popularSlice} from './popular';
import {nowPlayingSlice} from './nowPlaying';
import {topRatedSlice} from './topRated';
import {upcomingSlice} from './upcoming';
import { movieDetailSlice } from './movieDetail';

const rootReducers = combineReducers({
  common: commonSlice.reducer,
  toast: toastSlice.reducer,
  popular: popularSlice.reducer,
  nowPlaying: nowPlayingSlice.reducer,
  topRated: topRatedSlice.reducer,
  upcoming: upcomingSlice.reducer,
  movieDetail: movieDetailSlice.reducer,
});

export default rootReducers;
