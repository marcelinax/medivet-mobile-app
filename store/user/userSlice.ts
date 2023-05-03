import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from 'types/api/user/types';

interface UserSlice {
    currentUser: User | undefined;
}

const initialState: UserSlice = {
    currentUser: undefined
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User | undefined>) => {
            state.currentUser = action.payload;
        }
    }
});

export const {setCurrentUser} = userSlice.actions;
export default userSlice.reducer;
