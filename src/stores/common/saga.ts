import {takeLatest} from 'redux-saga/effects';
import {onInit} from './index';

function* appInit() {}

function* commonSaga() {
  yield takeLatest(onInit, appInit);
}

export default commonSaga;
