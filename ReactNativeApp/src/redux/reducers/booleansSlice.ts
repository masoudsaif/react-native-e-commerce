import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type SettingBooleans = typeof initialState;

export type SettingBoolean = keyof SettingBooleans;

const initialState = {
  isLoading: false,
  isTabBarActive: false,
};

const booleansSlice = createSlice({
  name: 'booleans',
  initialState,
  reducers: {
    turnOnBoolean(
      state,
      {payload}: PayloadAction<SettingBoolean | SettingBoolean[]>,
    ) {
      if (typeof payload === 'string') {
        state[payload] = true;
      } else {
        payload.forEach(bool => {
          state[bool] = true;
        });
      }
    },
    turnOffBoolean(
      state,
      {payload}: PayloadAction<SettingBoolean | SettingBoolean[]>,
    ) {
      if (typeof payload === 'string') {
        state[payload] = false;
      } else {
        payload.forEach(bool => {
          state[bool] = false;
        });
      }
    },
  },
});

export const {turnOnBoolean, turnOffBoolean} = booleansSlice.actions;

export default booleansSlice.reducer;
