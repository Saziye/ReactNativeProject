import {call, put, takeLatest} from 'redux-saga/effects';
import {MainApi} from 'services';
import {PayloadAction} from '@reduxjs/toolkit';
import {PopularModule} from 'models';
import {StatusCodes} from 'services/StatusCodes';
import {getPopulars, getPopularsSuccess, getPopularsFail} from './index';

function* onGetPopulars(
  api: MainApi
) {
  try {
    const onPopularSagaResponse: PopularModule.Response = yield call(
      [api, api.GetPopulars]
    );
    if (onPopularSagaResponse.status === StatusCodes.OK) {
      yield put(getPopularsSuccess(onPopularSagaResponse));
    } else {
      yield put(getPopularsFail());
    }
  } catch (error) {
    yield put(getPopularsFail());
  }
}

function* popularSaga(api: MainApi) {
  yield takeLatest(getPopulars, onGetPopulars, api);
}

export default popularSaga;
