import { createAsyncThunk } from "@reduxjs/toolkit";
import axios  from "axios";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  },
  unset() {
    axios.defaults.headers.common.Authorization = ''
  }
};

const register = createAsyncThunk('auth/register', async (credentials,{rejectWithValue}) => {
  try {
    const { data } = await axios.post('/users/signup', credentials)
    token.set(data.token)
    return data
  } catch (error) {
    return rejectWithValue()
  }
})

const logIn = createAsyncThunk('auth/logIn', async (credentials,{rejectWithValue}) => {
  try {
    const { data } = await axios.post('/users/login', credentials)
    token.set(data.token)
    return data
  } catch (error) {
      return rejectWithValue()
  }
});

const logOut = createAsyncThunk('auth/logout', async (_,{rejectWithValue}) => {
  try {
    await axios.post('/users/logout')
    token.unset()
  } catch (error) {
    return rejectWithValue()
  }
});

const fetchUser = createAsyncThunk('auth/fetchUser', async(_, { getState, rejectWithValue}) => {
  const state = getState();
  const persistedToken = state.auth.token;
  if (!persistedToken) return rejectWithValue();

  token.set(persistedToken)
  
  try {
    const { data } = await axios.get('/users/current');
    return data;
  } catch (error) {
    return rejectWithValue()
  }
});

export { register, logIn, logOut, fetchUser,token };
