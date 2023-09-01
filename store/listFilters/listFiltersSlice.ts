import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedFilter } from 'types/filters/types';

interface ListFiltersSlice {
  selectedFilters: SelectedFilter[];
}

const initialState: ListFiltersSlice = {
  selectedFilters: [],
};

export const listFiltersSlice = createSlice({
  name: 'listFilters',
  initialState,
  reducers: {
    setSelectedFilters: (state, action: PayloadAction<SelectedFilter[]>) => {
      state.selectedFilters = [ ...action.payload ];
    },
    clearSelectedFilters: (state) => {
      state.selectedFilters = [];
    },
  },
});

export const { setSelectedFilters, clearSelectedFilters } = listFiltersSlice.actions;
export default listFiltersSlice.reducer;
