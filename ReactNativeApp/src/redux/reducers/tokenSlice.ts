import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IToken {
  token: string | null;
}

const initialState: IToken = {
  token: null,
};

const tokenSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setToken(state, {payload}: PayloadAction<string | null>) {
      state.token = payload;
    },
  },
});

export const {setToken} = tokenSlice.actions;

export default tokenSlice.reducer;
