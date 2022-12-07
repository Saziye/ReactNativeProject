import {all, spawn} from 'redux-saga/effects';
import api from '../services';
//Sagas
import commonSaga from './common/saga';
import popularSaga from './popular/saga';

export default function* rootSaga() {
  yield all([spawn(commonSaga)]);
  yield all([spawn(popularSaga, api)]);
}
