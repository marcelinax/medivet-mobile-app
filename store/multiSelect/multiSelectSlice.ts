import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SelectOptionProps} from "types/components/Inputs/types";

interface MultiSelectSlice {
    selectedOptions: SelectOptionProps[];
}

const initialState: MultiSelectSlice = {
    selectedOptions: []
};

export const multiSelectSlice = createSlice({
    name: 'multiSelect',
    initialState,
    reducers: {
        setSelectedOptions: (state, action: PayloadAction<SelectOptionProps[]>) => {
            state.selectedOptions = action.payload;
        }
    }
});

export const {setSelectedOptions} = multiSelectSlice.actions;
export default multiSelectSlice.reducer;
