import {configureStore} from '@reduxjs/toolkit';
import authSlice from 'store/auth/authSlice';
import layoutSlice from 'store//layout/layoutSlice';
import userSlice from 'store/user/userSlice';
import animalSlice from "store/animal/animalSlice";
import multiSelectSlice from "store/multiSelect/multiSelectSlice";
import thunk from "redux-thunk";

export const store = configureStore({
    reducer: {
        layout: layoutSlice,
        auth: authSlice,
        user: userSlice,
        animal: animalSlice,
        multiSelect: multiSelectSlice
    },
    middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
