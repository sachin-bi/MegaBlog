import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
};

const authSlice = createSlice({
    // name is important(without it, we can't get the data)(using useSelector)
    name: "auth",
    initialState,
    reducers: {
        // login, logout these are the actions
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state, action) => {
            state.status = false;
            state.userData = null;
        },
    }
})

// login, logout these are the actions
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;