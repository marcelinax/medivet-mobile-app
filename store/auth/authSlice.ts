import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    isAuth: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (state?.token) state.isAuth = true;
      else state.isAuth = false;
    },
    removeToken: (state) => {
      state.token = null;
      state.isAuth = false;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
