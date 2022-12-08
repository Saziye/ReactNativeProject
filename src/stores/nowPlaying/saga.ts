import {call, put, takeLatest} from 'redux-saga/effects';
import {MainApi} from 'services';
import {PayloadAction} from '@reduxjs/toolkit';
import {NowPlayingModule} from 'models';
import {StatusCodes} from 'services/StatusCodes';
import {getNowPlayings, getNowPlayingsSuccess, getNowPlayingsFail} from './index';

function* onGetNowPlayings(
  api: MainApi
) {
  try {
    const onNowPlayingSagaResponse: NowPlayingModule.Response = yield call(
      [api, api.GetNowPlayings]
    );

    if (onNowPlayingSagaResponse.status === StatusCodes.OK) {
      yield put(getNowPlayingsSuccess(onNowPlayingSagaResponse));
    } else {
      yield put(getNowPlayingsFail());
    }
  } catch (error) {
    yield put(getNowPlayingsFail());
  }
}

function* popularSaga(api: MainApi) {
  yield takeLatest(getNowPlayings, onGetNowPlayings, api);
}

export default popularSaga;
