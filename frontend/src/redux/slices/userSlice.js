import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
    },
    reducers: {
        registerUser: (state, action) => {
            state.currentUser = action.payload;
        },

        updateUser: (state, action) => {
            state.currentUser = action.payload;
        }
    }
});

export const { registerUser, updateUser } = userSlice.actions;
export default userSlice.reducer;