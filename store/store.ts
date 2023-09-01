import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'store/auth/authSlice';
import userSlice from 'store/user/userSlice';
import multiSelectSlice from 'store/multiSelect/multiSelectSlice';
import thunk from 'redux-thunk';
import clinicSlice from 'store/clinic/clinicSlice';
import selectSlice from 'store/select/selectSlice';
import listFiltersSlice from 'store/listFilters/listFiltersSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    multiSelect: multiSelectSlice,
    clinic: clinicSlice,
    select: selectSlice,
    listFilters: listFiltersSlice,
  },
  middleware: [ thunk ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
