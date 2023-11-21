import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Job } from "../../types/job"
import { jobService } from "../../lib/services/jobService";
import { router } from "expo-router";
import { ToastAndroid } from "react-native";
import { RootState } from "..";

type initState = {
    search : string;
    data : Job[];
    
}

const initialState : initState = {
    data : [],
    search : ''
}

export const getPosts = createAsyncThunk('post/getPosts', async () => {
    try {
        const res = await jobService.get();
        return res
    } catch (error) {
        throw error
    }
})


export const addPost = createAsyncThunk('post/addNewPost', async (data : Job) => {
    try {
        const res = await jobService.add(data);
        router.back()
        ToastAndroid.show("Post Created", ToastAndroid.SHORT);
        return data
    } catch (error) {
        ToastAndroid.show("Error Creating Post", ToastAndroid.SHORT);
        throw error
    }
})


const postSlice = createSlice({
    name : 'post',
    initialState,
    reducers : {
        setSearch : (state, action) => {
            state.search = action.payload
        }
        
    },
    extraReducers : builder => {
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.data.push(action.payload)
        });
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.data = action.payload
        });
    }
})

export default postSlice.reducer

export const postActions = postSlice.actions

export const postSelector = (state : RootState) => state.post.data.filter(data => filterBySearch(state.post.search, data))

function filterBySearch(search : string, data : Job) {
    if(!search) return true;
    const name = data.title?.toLowerCase();
    return name?.includes(search.toLowerCase())
}