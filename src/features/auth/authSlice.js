import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

// First, create the thunk
export const loginThunk = createAsyncThunk('login', async (email, password) => {
    const response = await userApi.login({
        loginName: email,
        password: password,
    });
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        settings: null,
        roles: null,
    },
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        setRoles(state, action) {
            state.roles = action.payload;
        },
        logout(state) {
            state.currentUser = null;
            state.settings = null;
            state.roles = null;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            // Add user to the state array
            state.currentUser = action.payload;
        });
    },
});
// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectToken = (state) => state.auth.token;
export const selectLogging = (state) => (state.auth.currentUser ? true : false);
export const selectSetting = (state) => state.auth.settings;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
