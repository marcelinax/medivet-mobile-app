import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectOptionProps } from 'types/components/Inputs/types';

interface SingleMultiSelect {
  id: string;
  selectedOptions: SelectOptionProps[];
  loading: boolean;
  onChoose: (data: SelectOptionProps[]) => void | Promise<void>;
  fetch: (params?: Record<string, any>) => Promise<any[]>;
}

interface MultiSelectSlice {
  multiSelects: SingleMultiSelect[];
}

const initialState: MultiSelectSlice = {
  multiSelects: [],
};

const getMultiSelectById = (multiSelects: SingleMultiSelect[], id: string) => multiSelects.find((multiSelect) => multiSelect.id === id);

const getUpdatedMultiSelects = (multiSelects: SingleMultiSelect[], multiSelect: SingleMultiSelect) => {
  const newMultiSelects = [ ...multiSelects ];
  const multiSelectIndex = newMultiSelects.indexOf(multiSelect);
  newMultiSelects[multiSelectIndex] = { ...multiSelect };
  return newMultiSelects;
};

export const multiSelectSlice = createSlice({
  name: 'multiSelect',
  initialState,
  reducers: {
    initSingleMultiSelect: (state, action: PayloadAction<string>) => {
      state.multiSelects = [
        ...state.multiSelects, {
          id: action.payload,
          selectedOptions: [],
          fetch: async () => [],
          loading: false,
          onChoose: () => {
          },
        },
      ];
    },
    removeSingleMultiSelect: (state, action: PayloadAction<string>) => {
      const multiSelect = getMultiSelectById(state.multiSelects, action.payload);
      if (multiSelect) {
        const index = state.multiSelects.indexOf(multiSelect);
        const newMultiSelects = [ ...state.multiSelects ];
        newMultiSelects.splice(index, 1);
        state.multiSelects = [ ...newMultiSelects ];
      }
    },
    setSingleMultiSelectSelectedOptions: (state, action: PayloadAction<{
      options: SelectOptionProps[],
      id: string
    }>) => {
      const multiSelect = getMultiSelectById(state.multiSelects, action.payload.id);
      if (multiSelect) {
        multiSelect.selectedOptions = [ ...action.payload.options ];
        const updatedMultiSelects = getUpdatedMultiSelects(state.multiSelects, multiSelect);
        state.multiSelects = [ ...updatedMultiSelects ];
      }
    },
    setSingleMultiSelectButtonLoading: (state, action: PayloadAction<{
      loading: boolean,
      id: string
    }>) => {
      const multiSelect = getMultiSelectById(state.multiSelects, action.payload.id);
      if (multiSelect) {
        multiSelect.loading = action.payload.loading;
        const updatedMultiSelects = getUpdatedMultiSelects(state.multiSelects, multiSelect);
        state.multiSelects = [ ...updatedMultiSelects ];
      }
    },
    handleChooseSingleMultiSelectSelectedOptions: (state, action: PayloadAction<{
      onChoose: (options: SelectOptionProps[]) => void | Promise<void>,
      id: string
    }>) => {
      const multiSelect = getMultiSelectById(state.multiSelects, action.payload.id);
      if (multiSelect) {
        multiSelect.onChoose = action.payload.onChoose;
        const updatedMultiSelects = getUpdatedMultiSelects(state.multiSelects, multiSelect);
        state.multiSelects = [ ...updatedMultiSelects ];
      }
    },
    fetchSingleMultiSelectOptions: (state, action: PayloadAction<{
      fetch: ((params?: Record<string, any>) => Promise<any[]>),
      id: string
    }>) => {
      const multiSelect = getMultiSelectById(state.multiSelects, action.payload.id);
      if (multiSelect) {
        multiSelect.fetch = action.payload.fetch;
        const updatedMultiSelects = getUpdatedMultiSelects(state.multiSelects, multiSelect);
        state.multiSelects = [ ...updatedMultiSelects ];
      }
    },
  },
});

export const {
  initSingleMultiSelect,
  handleChooseSingleMultiSelectSelectedOptions,
  setSingleMultiSelectSelectedOptions,
  setSingleMultiSelectButtonLoading,
  removeSingleMultiSelect,
  fetchSingleMultiSelectOptions,
} = multiSelectSlice.actions;
export default multiSelectSlice.reducer;
