import {configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import thunk from 'redux-thunk';

import reducer from './reducers/reducer';

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;

export const authState = (state: RootState) => state.main.auth;

export const booleansState = (state: RootState) => state.main.booleans;

export const settingsState = (state: RootState) => state.main.settings;

export const tokenState = (state: RootState) => state.token;

export const persistor = persistStore(store);

export default store;
