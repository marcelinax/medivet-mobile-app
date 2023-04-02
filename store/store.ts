import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import layoutSlice from './layout/layoutSlice';
import userSlice from './user/userSlice';

export const store = configureStore({
    reducer: {
        layout: layoutSlice,
        auth: authSlice,
        user: userSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;