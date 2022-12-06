import {configureStore} from '@reduxjs/toolkit';
import {CurriedGetDefaultMiddleware} from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const privateStorage = new MMKVLoader().withEncryption().initialize();

const persistConfig = {
  key: 'root',
  storage: privateStorage,
  whitelist: [], // Buraya persist kullanacağımız reducerları eklememiz gerekiyor.
  debug: true,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const middleware = (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: true,
    immutableCheck: false,
    serializableCheck: false,
  })
    .concat(sagaMiddleware)
    .concat(logger);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
