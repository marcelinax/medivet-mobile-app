import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchVetsFilters } from 'types/filters/types';

interface HomeSlice {
  selectedFilters: SearchVetsFilters;
}

const initialState: HomeSlice = {
  selectedFilters: {
    city: '',
    specialization: undefined,
  },
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSelectedFilters: (state, action: PayloadAction<SearchVetsFilters>) => {
      state.selectedFilters = { ...action.payload };
    },
    clearSelectedFilters: (state) => {
      state.selectedFilters = { ...initialState.selectedFilters };
    },
  },
});

export const { setSelectedFilters, clearSelectedFilters } = homeSlice.actions;
export default homeSlice.reducer;
