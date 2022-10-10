import { createSlice }  from "@reduxjs/toolkit";
import { register,logIn, logOut,fetchUser } from './authOperations';


const initialState = {
  user: { name: null, email: null },

  token: null,
  isLoggedIn: false,

  fetchLoading: false,
  
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      //REGISTER
      .addCase(register.pending, (state) => {
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.error = payload;

      })

      //LOG_IN
      .addCase(logIn.pending, (state) => {
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.error = payload;

      })
      //LOG_OUT
      .addCase(logOut.pending, (state) => {
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(logOut.fulfilled, (state) => {

        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logOut.rejected, (state, { payload }) => {
        state.error = payload;

      })
      //GET_CURRENT_USER
      .addCase(fetchUser.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.fetchLoading = false;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, { payload }) => {
        state.fetchLoading = false;
        state.error = payload;

      })
  }
})


export default authSlice.reducer;
