import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Clinic } from 'types/api/clinic/types';

interface ClinicSlice {
  currentClinic: Clinic | undefined;
}

const initialState: ClinicSlice = {
  currentClinic: undefined,
};

export const clinicSlice = createSlice({
  name: 'clinic',
  initialState,
  reducers: {
    setCurrentClinic: (state, action: PayloadAction<Clinic | undefined>) => {
      state.currentClinic = action.payload;
    },
  },
});

export const { setCurrentClinic } = clinicSlice.actions;
export default clinicSlice.reducer;
