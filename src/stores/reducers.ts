import {combineReducers} from 'redux';
import {commonSlice} from './common';
import {toastSlice} from './toast';

const rootReducers = combineReducers({
  common: commonSlice.reducer,
  toast: toastSlice.reducer,
});

export default rootReducers;
