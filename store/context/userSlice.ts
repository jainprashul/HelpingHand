import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Profile } from "../../types/user"

type initState = {
    data : Profile[]

    signup?: {
        username : string,
        password : string,
    },
}

const initialState : initState = {
    data : [],
    signup : undefined,
}

export const addProfile = createAsyncThunk('profile/addNewProfile', async (data : Profile) => {
    try {
        return Promise.resolve(data)
    } catch (error) {
        throw error
    }
})

export const profileSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        
        addSignup : (state, action : PayloadAction<{username : string, password : string}>) => {
            state.signup = action.payload
        }
    },
    extraReducers : builder => {
        builder.addCase(addProfile.fulfilled, (state, action) => {
            state.data.push(action.payload)
        })
    }
})

export const userActions = profileSlice.actions

export default profileSlice.reducer