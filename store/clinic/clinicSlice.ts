import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Clinic } from 'types/api/clinic/types';
import { VetAvailabilityFormProps, VetAvailabilityReceptionHourFormProps } from 'types/api/vetAvailability/types';

interface ClinicSlice {
  currentClinic: Clinic | undefined;
  currentVetClinicAvailability: VetAvailabilityFormProps | undefined;
}

const initialState: ClinicSlice = {
  currentClinic: undefined,
  currentVetClinicAvailability: undefined,
};

export const clinicSlice = createSlice({
  name: 'clinic',
  initialState,
  reducers: {
    setCurrentClinic: (state, action: PayloadAction<Clinic | undefined>) => {
      state.currentClinic = action.payload;
    },
    setCurrentVetClinicAvailability: (state, action: PayloadAction<VetAvailabilityFormProps | undefined>) => {
      state.currentVetClinicAvailability = action.payload;
    },
    updateCurrentVetClinicAvailabilityReceptionHours: (state, action: PayloadAction<{
      receptionHour: VetAvailabilityReceptionHourFormProps,
      index?: number
    }>) => {
      const availability = state.currentVetClinicAvailability;
      if (availability) {
        const receptionHours = [ ...availability.receptionHours ];
        const { index } = action.payload;
        if (index !== undefined) {
          receptionHours[index] = {
            ...action.payload.receptionHour,
          };
        } else {
          const newReceptionHour = { ...action.payload.receptionHour };
          receptionHours.push(newReceptionHour);
        }
        state.currentVetClinicAvailability = {
          ...availability,
          receptionHours: [ ...receptionHours ],
        };
      }
    },
    removeCurrentVetClinicAvailabilityReceptionHour: (state, action: PayloadAction<number>) => {
      if (state.currentVetClinicAvailability) {
        const receptionHourToRemove = state.currentVetClinicAvailability.receptionHours[action.payload];
        if (receptionHourToRemove) {
          const newReceptionHours = [ ...state.currentVetClinicAvailability.receptionHours ];
          newReceptionHours.splice(action.payload, 1);
          state.currentVetClinicAvailability.receptionHours = [ ...newReceptionHours ];
        }
      }
    },
  },
});

export const {
  setCurrentClinic,
  setCurrentVetClinicAvailability,
  updateCurrentVetClinicAvailabilityReceptionHours,
  removeCurrentVetClinicAvailabilityReceptionHour,
} = clinicSlice.actions;
export default clinicSlice.reducer;
