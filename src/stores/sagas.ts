import {all, spawn} from 'redux-saga/effects';
//Sagas
import commonSaga from './common/saga';

export default function* rootSaga() {
  yield all([spawn(commonSaga)]);
}
