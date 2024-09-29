'use client';

import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import storage from './customStorage';
import {configReducer} from './slices/configSlice';
import { voucherTopupReducer } from './slices/voucherTopupSlice';

const voucherTopupPersistConfig = {
  key: 'voucherTopup',
  storage,
  blacklist: ['token'],
};

const configPersistConfig = {
  key: 'config',
  storage,
  whitelist: ['isUsingProduction', 'isUsingStaging'],
};

const rootReducer = combineReducers({
  voucherTopup: persistReducer(voucherTopupPersistConfig, voucherTopupReducer),
  config: persistReducer(configPersistConfig, configReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type ReduxState = ReturnType<typeof store.getState>;
