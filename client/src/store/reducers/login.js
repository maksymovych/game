import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  postLogOut,
  getUser,
  postAuth,
  postLogin,
  postRecovery,
} from '../../api/api';

const initialState = {
  isLogin: false,
  isAuth: false,
  loginForm: {},
  authForm: {},
  message: '',
  nickname: '',
  confirmMessage: '',
  isFetching: false,
  recoveryDone: false,

  id: null,
  gameId: null,
  isStart: false,
};

export const getUserData = createAsyncThunk('login/getUserData', async () => {
  const data = await getUser();
  return data;
});

export const fetchAuth = createAsyncThunk('login/fetchAuth', async (user) => {
  const data = await postAuth(user);

  return data;
});

export const fetchLogin = createAsyncThunk('login/fetchLogin', async (user) => {
  const data = await postLogin(user);

  return data;
});

export const fetchRecovery = createAsyncThunk(
  'login/fetchRecovery',
  async (values) => {
    const data = await postRecovery(values);
    return data;
  }
);

export const fetchLogout = createAsyncThunk('login/fetchLogout', async (id) => {
  const { data } = await postLogOut(id);
  return data;
});

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAuthForm: (state, action) => {
      state.authForm = action.payload;
      state.isAuth = true;
    },
    logOut: (state) => {
      state.isAuth = false;
      state.isLogin = false;
    },
  },
  extraReducers: {
    [fetchAuth.fulfilled](state, action) {
      state.isAuth = action.payload.success;
      state.authForm = action.payload;
    },
    [fetchLogin.fulfilled](state, action) {
      state.id = action.payload?.userData.id;
      state.loginForm = action.payload?.userData;
      state.isLogin = action.payload.success;
      state.message = action.payload.message;
    },
    [fetchRecovery.pending](state) {
      state.isFetching = true;
    },
    [fetchRecovery.fulfilled](state, action) {
      if (action.payload.status) {
        state.nickname = action.payload.nickname;
        state.recoveryDone = true;
      }
      state.confirmMessage = action.payload.message;
      state.isFetching = false;
    },

    [fetchRecovery.rejected](state) {
      state.isFetching = false;
    },
    [fetchLogout.fulfilled](state) {
      state.isLogin = false;
      state.isAuth = false;
    },
    [getUserData.fulfilled](state, action) {
      state.authForm = action.payload;
      state.isAuth = action.payload.success;
      state.isLogin = action.payload.success;
    },
  },
});

export const { setAuthForm, logOut } = loginSlice.actions;
export default loginSlice.reducer;
