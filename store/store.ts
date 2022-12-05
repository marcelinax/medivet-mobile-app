import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import layoutSlice from './layout/layoutSlice';

export const store = configureStore({
    reducer: {
        layout: layoutSlice,
        auth: authSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;