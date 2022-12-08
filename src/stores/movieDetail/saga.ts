import {call, put, takeLatest} from 'redux-saga/effects';
import {MainApi} from 'services';
import {PayloadAction} from '@reduxjs/toolkit';
import {MovieDetailModule, MovieCreditModule, MovieReviewsModule} from 'models';
import {StatusCodes} from 'services/StatusCodes';
import {
  getMovieDetailSuccess,
  getMovieDetailFail,
  getMovieDetail,
  getMovieCredit,
  getMovieCreditSuccess,
  getMovieCreditFail,
  getMovieReviews,
  getMovieReviewsSuccess,
  getMovieReviewsFail,
} from './index';

function* onGetMovie(
  api: MainApi,
  action: PayloadAction<MovieDetailModule.Request>,
) {
  try {
    const response: MovieDetailModule.Response = yield call(
      [api, api.GetMovie],
      {
        id: action.payload.id,
      } as MovieDetailModule.Request,
    );
    if (response.status === StatusCodes.OK) {
      yield put(getMovieDetailSuccess(response));
    } else {
      yield put(getMovieDetailFail());
    }
  } catch (error) {
    yield put(getMovieDetailFail());
  }
}

function* onGetMovieCast(
  api: MainApi,
  action: PayloadAction<MovieCreditModule.Request>,
) {
  try {
    const response: MovieCreditModule.Response = yield call(
      [api, api.GetMovieCast],
      {
        id: action.payload.id,
      } as MovieCreditModule.Request,
    );
    if (response.status === StatusCodes.OK) {
      yield put(getMovieCreditSuccess(response));
    } else {
      yield put(getMovieCreditFail());
    }
  } catch (error) {
    yield put(getMovieCreditFail());
  }
}

function* onGetMovieReviews(
  api: MainApi,
  action: PayloadAction<MovieReviewsModule.Request>,
) {
  try {
    const response: MovieReviewsModule.Response = yield call(
      [api, api.GetMovieReviews],
      {
        id: action.payload.id,
      } as MovieReviewsModule.Request,
    );
    if (response.status === StatusCodes.OK) {
      yield put(getMovieReviewsSuccess(response));
    } else {
      yield put(getMovieReviewsFail());
    }
  } catch (error) {
    yield put(getMovieReviewsFail());
  }
}

function* movieSaga(api: MainApi) {
  yield takeLatest(getMovieDetail, onGetMovie, api);
  yield takeLatest(getMovieCredit, onGetMovieCast, api);
  yield takeLatest(getMovieReviews, onGetMovieReviews, api);
}

export default movieSaga;
