import { SelectOptionProps } from 'types/components/Inputs/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppointmentDetails {
  clinicAddress?: SelectOptionProps;
  medicalService?: SelectOptionProps;
  animal?: SelectOptionProps;
  hour?: string;
  date?: string;
  vet?: string;
  price?: number;
  specialization?: SelectOptionProps;
}

interface AppointmentSlice {
  appointmentDetails: AppointmentDetails;
}

type AppointmentDetail = 'clinicAddress' | 'medicalService' | 'animal' | 'hour' | 'date' | 'vet' | 'price';

const initialState: AppointmentSlice = {
  appointmentDetails: {},
};

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setAppointmentDetails: (state, action: PayloadAction<AppointmentDetails>) => {
      state.appointmentDetails = {
        ...action.payload,
      };
    },
    updateAppointmentDetails: (state, action: PayloadAction<{
      field: AppointmentDetail;
      value: SelectOptionProps | number | undefined | string
    }>) => {
      state.appointmentDetails = {
        ...state.appointmentDetails,
        [action.payload.field]: action.payload.value,
      };
    },
  },
});

export const { setAppointmentDetails, updateAppointmentDetails } = appointmentSlice.actions;
export default appointmentSlice.reducer;
