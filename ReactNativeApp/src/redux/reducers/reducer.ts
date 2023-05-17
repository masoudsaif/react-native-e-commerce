import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist-filesystem-storage';
import createSensitiveStorage from 'redux-persist-sensitive-storage';

import authReducer from './authSlice';
import booleansReducer from './booleansSlice';
import settingsReducer from './settingsSlice';
import tokenReducer from './tokenSlice';

export const sensitiveStorage = createSensitiveStorage();

const tokenPersistConfig = {
  key: 'token',
  storage: sensitiveStorage,
};

const mainPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'settings'],
};

const mainReducer = combineReducers({
  auth: authReducer,
  booleans: booleansReducer,
  settings: settingsReducer,
});

export default combineReducers({
  main: persistReducer(mainPersistConfig, mainReducer),
  token: persistReducer(tokenPersistConfig, tokenReducer),
});
