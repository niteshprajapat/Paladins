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
        },

        logoutUser: (state, action) => {
            state.currentUser = null;
        },

        deleteUser: (state, action) => {
            state.currentUser = null;
        }
    }
});

export const { registerUser, updateUser, logoutUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;