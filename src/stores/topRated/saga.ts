import {call, put, takeLatest} from 'redux-saga/effects';
import {MainApi} from 'services';
import {PayloadAction} from '@reduxjs/toolkit';
import {TopRatedModule} from 'models';
import {StatusCodes} from 'services/StatusCodes';
import {getTopRateds, getTopRatedsSuccess, getTopRatedsFail} from './index';

function* onGetTopRateds(
  api: MainApi
) {
  try {
    const onTopRatedSagaResponse: TopRatedModule.Response = yield call(
      [api, api.GetTopRateds]
    );

    if (onTopRatedSagaResponse.status === StatusCodes.OK) {
      yield put(getTopRatedsSuccess(onTopRatedSagaResponse));
    } else {
      yield put(getTopRatedsFail());
    }
  } catch (error) {
    yield put(getTopRatedsFail());
  }
}

function* topRatedSaga(api: MainApi) {
  yield takeLatest(getTopRateds, onGetTopRateds, api);
}

export default topRatedSaga;
