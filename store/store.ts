import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'store/auth/authSlice';
import userSlice from 'store/user/userSlice';
import animalSlice from 'store/animal/animalSlice';
import multiSelectSlice from 'store/multiSelect/multiSelectSlice';
import thunk from 'redux-thunk';
import clinicSlice from 'store/clinic/clinicSlice';
import selectSlice from 'store/select/selectSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    animal: animalSlice,
    multiSelect: multiSelectSlice,
    clinic: clinicSlice,
    select: selectSlice,
  },
  middleware: [ thunk ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
