import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LayoutSlice {
    showSelectInputOptionsModal: boolean;
}

const initialState: LayoutSlice = {
    showSelectInputOptionsModal: false
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setShowSelectInputOptionsModal: (state, action: PayloadAction<boolean>) => {
            state.showSelectInputOptionsModal = action.payload;
        }
    }
});

export const { setShowSelectInputOptionsModal } = layoutSlice.actions;
export default layoutSlice.reducer;