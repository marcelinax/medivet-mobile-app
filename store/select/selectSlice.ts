import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectOptionProps } from 'types/components/Inputs/types';

interface SingleSelect {
  id: string;
  loading: boolean;
  onChoose: (option: SelectOptionProps) => void | Promise<void>;
  fetch?: (params?: Record<string, any>) => Promise<any[]>;
  selectedOption?: SelectOptionProps;
  options?: SelectOptionProps[];
}

interface SelectSlice {
  selects: SingleSelect[];
}

const initialState: SelectSlice = {
  selects: [],
};

const getSelectById = (selects: SingleSelect[], id: string) => selects.find((select) => select.id === id);

const getUpdatedSelects = (selects: SingleSelect[], select: SingleSelect) => {
  const newSelects = [ ...selects ];
  const selectIndex = newSelects.indexOf(select);
  newSelects[selectIndex] = { ...select };
  return newSelects;
};

export const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    initSingleSelect: (state, action: PayloadAction<string>) => {
      state.selects = [
        ...state.selects, {
          id: action.payload,
          loading: false,
          onChoose: () => {
          },
        },
      ];
    },
    removeSingleSelect: (state, action: PayloadAction<string>) => {
      const select = getSelectById(state.selects, action.payload);
      if (select) {
        const index = state.selects.indexOf(select);
        const newSelects = [ ...state.selects ];
        newSelects.splice(index, 1);
        state.selects = [ ...newSelects ];
      }
    },
    setSingleSelectSelectedOption: (state, action: PayloadAction<{
      option: SelectOptionProps | undefined,
      id: string
    }>) => {
      const select = getSelectById(state.selects, action.payload.id);
      if (select) {
        select.selectedOption = action.payload.option;
        const updatedSelects = getUpdatedSelects(state.selects, select);
        state.selects = [ ...updatedSelects ];
      }
    },
    setSingleSelectButtonLoading: (state, action: PayloadAction<{
      loading: boolean,
      id: string
    }>) => {
      const select = getSelectById(state.selects, action.payload.id);
      if (select) {
        select.loading = action.payload.loading;
        const updatedSelects = getUpdatedSelects(state.selects, select);
        state.selects = [ ...updatedSelects ];
      }
    },
    handleChooseSingleSelectSelectedOption: (state, action: PayloadAction<{
      onChoose: (option: SelectOptionProps) => void | Promise<void>,
      id: string
    }>) => {
      const select = getSelectById(state.selects, action.payload.id);
      if (select) {
        select.onChoose = action.payload.onChoose;
        const updatedSelects = getUpdatedSelects(state.selects, select);
        state.selects = [ ...updatedSelects ];
      }
    },
    fetchSingleSelectOptions: (state, action: PayloadAction<{
      fetch: ((params?: Record<string, any>) => Promise<any[]>) | undefined,
      id: string
    }>) => {
      const select = getSelectById(state.selects, action.payload.id);
      if (select) {
        select.fetch = action.payload.fetch;
        const updatedSelects = getUpdatedSelects(state.selects, select);
        state.selects = [ ...updatedSelects ];
      }
    },
    setSingleSelectOptions: (state, action: PayloadAction<{
      options: SelectOptionProps[] | undefined,
      id: string
    }>) => {
      const select = getSelectById(state.selects, action.payload.id);
      if (select) {
        select.options = action.payload.options;
        const updatedSelects = getUpdatedSelects(state.selects, select);
        state.selects = [ ...updatedSelects ];
      }
    },
  },
});

export const {
  handleChooseSingleSelectSelectedOption,
  setSingleSelectButtonLoading, setSingleSelectSelectedOption,
  initSingleSelect,
  fetchSingleSelectOptions,
  setSingleSelectOptions,
  removeSingleSelect,
} = selectSlice.actions;
export default selectSlice.reducer;
