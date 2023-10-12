import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedFilter } from 'types/filters/types';

interface ListFiltersSlice {
  selectedFilters: SelectedFilter[];
  forceFetchingList?: boolean;
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
    setForceFetchingList: (state, action: PayloadAction<boolean>) => {
      state.forceFetchingList = action.payload;
    },
  },
});

export const { setSelectedFilters, clearSelectedFilters, setForceFetchingList } = listFiltersSlice.actions;
export default listFiltersSlice.reducer;
