import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../utility/constants/types';

interface IAuth {
  user: IUser | null;
}

const initialState: IAuth = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInUser(state, {payload}: PayloadAction<IUser>) {
      state.user = payload;
    },
    signOutUser(state) {
      state.user = null;
    },
  },
});

export const {signInUser, signOutUser} = authSlice.actions;

export default authSlice.reducer;
