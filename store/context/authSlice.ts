import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { store } from '..';

type initState = {
  isAuth: boolean;
  token: string;
  user: any;
};

const dummyUser = {
    username: 'admin',
    password: 'admin',
    name: 'Admin',
    email: 'admin@test.com'
}

const initialState: initState = {
  isAuth: false,
  token: '',
  user: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: {username: string; password: string}) => {
    try {
        // check with dummy user
        if(data.username === dummyUser.username && data.password === dummyUser.password){
            return Promise.resolve({
                user : {
                    name : dummyUser.name,
                    email : dummyUser.email
                },
                token : 'dummytoken',
            })
        }else{
            return Promise.reject('Invalid username or password')
        }
    } catch (error) {
      throw error;
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    logOff: state => {
      state.isAuth = false;
      state.token = '';
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuth = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action);
      throw action.error;
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
