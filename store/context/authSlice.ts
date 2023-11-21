import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { store } from '..';
import { AuthUser, supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js'
import { Profile, User } from '../../types/user';
import { generateUUID } from '../../utils';


type initState = {
  isAuth: boolean;
  token: string;
  user: AuthUser | null;
  profile : Profile | null;
};

const initialState: initState = {
  isAuth: false,
  token: '',
  user: null,
  profile : null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: {username: string; password: string}) => {
    try {
        const res = await supabase.auth.signInWithPassword({
          email : data.username,
          password : data.password,
        })

        if(res.error){
            return Promise.reject(res.error.message)
        }

        return res.data
    } catch (error) {
      throw error;
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (data: {username: string; password: string}) => {
    try {
        const res = await supabase.auth.signUp({
          email : data.username,
          password : data.password,
        })
        if(res.error){
          return Promise.reject(res.error.message)
        } 

        if(res.data.user){
          const _user = res.data.user

          const profile : Profile = {
            id : _user.id,
          email : data.username,
          name : '',
          avatar : '',
          address : '',
          city : '',
          phone : '',
          skills : [],
          bio : ''
          }
         const user =await supabase.from('users').insert([profile])
          console.log(user , "user created")
      }
        return res.data
        
    } catch (error) {
      throw error;
    }
  },
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data : Profile) => {
    try {
      const res = await supabase.from('users').update(data).eq('id', data.id)
      if(res.error){
        return Promise.reject(res.error.message)
      }
      return data
    } catch (error) {
      throw error
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    
    setProfile : (state, action : PayloadAction<Profile>) => {
      state.profile = action.payload
    },

    setSession: (state, action: PayloadAction<Session>) => {
      state.token = action.payload.access_token;
      state.user = action.payload.user;
      state.isAuth = true;
    },
    logOff: state => {
      state.isAuth = false;
      state.token = '';
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.session.access_token;
      state.user = action.payload.user;
      state.isAuth = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log(action.payload , "signup ful" );
      state.token = action.payload.session?.access_token ?? '';
      state.user = action.payload.user;
      state.isAuth = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action);
      throw action.error;
    });
    builder.addCase(signup.rejected, (state, action) => {
      console.log(action);
      throw action.error;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profile = action.payload
    })
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
