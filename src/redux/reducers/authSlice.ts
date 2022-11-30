import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

interface IAuth {
  token: string | null;
  user?: IUser | null;
}

const initialState: IAuth = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    loginUser(state, { payload }: PayloadAction<IAuth>) {
      state = payload;
    },
    logoutUser(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
