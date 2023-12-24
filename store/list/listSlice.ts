import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedFilter } from 'types/filters/types';

interface ListSlice {
  selectedFilters: SelectedFilter[];
  forceFetchingList?: boolean;
}

const initialState: ListSlice = {
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
    updateFilter: (state, action: PayloadAction<SelectedFilter>) => {
      const index = state.selectedFilters.findIndex((filter) => filter.id === action.payload.id);
      if (index > -1) {
        state.selectedFilters[index].value = action.payload.value;
      } else {
        state.selectedFilters = [
          ...state.selectedFilters,
          action.payload,
        ];
      }
    },
    clearFilter: (state, action: PayloadAction<string>) => {
      const filterIndex = state.selectedFilters.findIndex((selectedFilter) => selectedFilter.id === action.payload);

      if (filterIndex > -1) {
        const newFilters = [ ...state.selectedFilters ];
        newFilters.splice(filterIndex, 1);
        state.selectedFilters = [ ...newFilters ];
      }
    },
  },
});

export const {
  setSelectedFilters,
  clearSelectedFilters,
  setForceFetchingList,
  updateFilter,
  clearFilter,
} = listFiltersSlice.actions;
export default listFiltersSlice.reducer;
