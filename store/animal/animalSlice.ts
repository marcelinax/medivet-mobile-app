import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Animal} from "types/api/animal/types";

interface AnimalSlice {
    animalToUpdate: Animal | undefined;
}

const initialState: AnimalSlice = {
    animalToUpdate: undefined
};

export const animalSlice = createSlice({
    name: 'animal',
    initialState,
    reducers: {
        setAnimalToUpdate: (state, action: PayloadAction<Animal | undefined>) => {
            state.animalToUpdate = action.payload;
        }
    }
});

export const {setAnimalToUpdate} = animalSlice.actions;
export default animalSlice.reducer;
