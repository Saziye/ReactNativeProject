import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MovieDetailModule, MovieCreditModule, MovieReviewsModule} from 'models';
import {RootState} from 'stores';

const initialState: MovieDetailModule.MovieDetailStore &
  MovieCreditModule.MovieCreditStore &
  MovieReviewsModule.MovieReviewsStore = {
  movieDetail: undefined,
  movieCredit: undefined,
  movieReviews: undefined,
  loading: false,
};

export const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {
    getMovieDetail: (
      state: MovieDetailModule.MovieDetailStore,
      action: PayloadAction<MovieDetailModule.Request>,
    ) => {
      state.loading = true;
    },
    getMovieDetailSuccess: (
      state: MovieDetailModule.MovieDetailStore,
      {payload}: PayloadAction<MovieDetailModule.Response>,
    ) => {
      state.loading = false;
      state.movieDetail = payload?.data;
    },
    getMovieDetailFail: (
      state: MovieDetailModule.MovieDetailStore,
      // action: PayloadAction<MovieDetailModule.Error>,
    ) => {
      state.loading = false;
    },
    getMovieCredit: (
      state: MovieCreditModule.MovieCreditStore,
      action: PayloadAction<MovieCreditModule.Request>,
    ) => {
      state.loading = true;
    },
    getMovieCreditSuccess: (
      state: MovieCreditModule.MovieCreditStore,
      {payload}: PayloadAction<MovieCreditModule.Response>,
    ) => {
      state.loading = false;
      state.movieCredit = payload?.data;
    },
    getMovieCreditFail: (
      state: MovieCreditModule.MovieCreditStore,
      // action: PayloadAction<MovieCreditModule.Error>,
    ) => {
      state.loading = false;
    },
    getMovieReviews: (
      state: MovieReviewsModule.MovieReviewsStore,
      action: PayloadAction<MovieReviewsModule.Request>,
    ) => {
      state.loading = true;
    },
    getMovieReviewsSuccess: (
      state: MovieReviewsModule.MovieReviewsStore,
      {payload}: PayloadAction<MovieReviewsModule.Response>,
    ) => {
      state.loading = false;
      state.movieReviews = payload?.data;
    },
    getMovieReviewsFail: (
      state: MovieReviewsModule.MovieReviewsStore,
      // action: PayloadAction<MovieReviewsModule.Error>,
    ) => {
      state.loading = false;
    },
  },
});

export const {
  getMovieDetail,
  getMovieDetailSuccess,
  getMovieDetailFail,
  getMovieCredit,
  getMovieCreditSuccess,
  getMovieCreditFail,
  getMovieReviews,
  getMovieReviewsSuccess,
  getMovieReviewsFail,
} = movieDetailSlice.actions;

export const movieDetailStore = (state: RootState) => state.movieDetail;

export default movieDetailSlice.reducer;
