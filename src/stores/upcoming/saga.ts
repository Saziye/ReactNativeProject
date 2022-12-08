import {call, put, takeLatest} from 'redux-saga/effects';
import {MainApi} from 'services';
import {PayloadAction} from '@reduxjs/toolkit';
import {UpcomingModule} from 'models';
import {StatusCodes} from 'services/StatusCodes';
import {getUpcomings, getUpcomingsSuccess, getUpcomingsFail} from './index';

function* onGetUpcomings(
  api: MainApi
) {
  try {
    const onUpcomingSagaResponse: UpcomingModule.Response = yield call(
      [api, api.GetUpcomings]
    );

    if (onUpcomingSagaResponse.status === StatusCodes.OK) {
      yield put(getUpcomingsSuccess(onUpcomingSagaResponse));
    } else {
      yield put(getUpcomingsFail());
    }
  } catch (error) {
    yield put(getUpcomingsFail());
  }
}

function* upcomingSaga(api: MainApi) {
  yield takeLatest(getUpcomings, onGetUpcomings, api);
}

export default upcomingSaga;
