import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'store/auth/authSlice';
import userSlice from 'store/user/userSlice';
import multiSelectSlice from 'store/multiSelect/multiSelectSlice';
import thunk from 'redux-thunk';
import clinicSlice from 'store/clinic/clinicSlice';
import selectSlice from 'store/select/selectSlice';
import listSlice from 'store/list/listSlice';
import homeSlice from 'store/home/homeSlice';
import appointmentSlice from 'store/home/appointmentSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    multiSelect: multiSelectSlice,
    clinic: clinicSlice,
    select: selectSlice,
    list: listSlice,
    home: homeSlice,
    appointment: appointmentSlice,
  },
  middleware: [ thunk ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
