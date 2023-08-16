import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRoleType } from 'types/api/user/types';

interface UserSlice {
    currentUser: User | undefined;
    userRole: UserRoleType | undefined;
}

const initialState: UserSlice = {
  currentUser: undefined,
  userRole: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | undefined>) => {
      state.currentUser = action.payload;
    },
    setUserRole: (state, action: PayloadAction<UserRoleType>) => {
      state.userRole = action.payload;
    },
  },
});

export const { setCurrentUser, setUserRole } = userSlice.actions;
export default userSlice.reducer;
