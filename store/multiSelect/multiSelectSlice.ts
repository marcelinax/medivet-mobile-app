import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectOptionProps } from 'types/components/Inputs/types';

interface MultiSelectSlice {
  selectedOptions: SelectOptionProps[];
  loading: boolean;
  onChoose: (data: SelectOptionProps[]) => void | Promise<void>;
  fetch: (params?: Record<string, any>) => Promise<any[]>;
}

const initialState: MultiSelectSlice = {
  selectedOptions: [],
  loading: false,
  onChoose: (data: SelectOptionProps[]) => {
  },
  fetch: async (params?: Record<string, any>) => [],
};

export const multiSelectSlice = createSlice({
  name: 'multiSelect',
  initialState,
  reducers: {
    setSelectedOptions: (state, action: PayloadAction<SelectOptionProps[]>) => {
      state.selectedOptions = action.payload;
    },
    setMultiSelectButtonLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    onChooseSelectedOptions: (state, action: PayloadAction<(data: SelectOptionProps[]) => void | Promise<void>>) => {
      state.onChoose = action.payload;
    },
    fetchMultiSelectOptions: (state, action: PayloadAction<(params?: Record<string, any>) => Promise<any[]>>) => {
      state.fetch = action.payload;
    },
  },
});

export const {
  setSelectedOptions,
  setMultiSelectButtonLoading,
  onChooseSelectedOptions,
  fetchMultiSelectOptions,
} = multiSelectSlice.actions;
export default multiSelectSlice.reducer;
