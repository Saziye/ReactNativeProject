import {combineReducers} from 'redux';
import {commonSlice} from './common';
import {toastSlice} from './toast';
import {popularSlice} from './popular';

const rootReducers = combineReducers({
  common: commonSlice.reducer,
  toast: toastSlice.reducer,
  popular: popularSlice.reducer,
});

export default rootReducers;
