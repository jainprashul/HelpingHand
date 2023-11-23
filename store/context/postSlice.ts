import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Job } from "../../types/job"
import { jobService } from "../../lib/services/jobService";
import { router } from "expo-router";
import { ToastAndroid } from "react-native";
import { RootState } from "..";

type initState = {
    search : string;
    data : Job[];
    locationList : string[];

    filterOpen : boolean;
    filterLocation : string;
    filterEnable : boolean;
    
}

const initialState : initState = {
    data : [],
    locationList : [],
    search : '',
    
    filterOpen : false,
    filterLocation : '',
    filterEnable : false,
}

export const getPosts = createAsyncThunk('post/getPosts', async () => {
    try {
        const res = await jobService.get();
        return res.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
    } catch (error) {
        throw error
    }
})

export const getLocations = createAsyncThunk('post/getLocations', async () => {
    try {
        const res = await jobService.getLocations();
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
        },
        setFilterOpen : (state, action : PayloadAction<boolean>) => {
            state.filterOpen = action.payload
        },
        setFilterLocation : (state, action : PayloadAction<string>) => {
            state.filterLocation = action.payload
        },

        setFilterEnable : (state, action : PayloadAction<boolean>) => {
            state.filterEnable = action.payload
        }
        
    },
    extraReducers : builder => {
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.data.push(action.payload)
        });
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.data = action.payload
            state.locationList = Array.from(new Set(action.payload.map((item : any) => item.location)))
        });
        
    }
})

export default postSlice.reducer

export const postActions = postSlice.actions

export const postSelector = (state : RootState) => state.post.data.filter(data => {
    const searchFilter =    filterBySearch(state.post.search, data)
    const locationFilter = filterByLocation(state.post.filterLocation, data) && state.post.filterEnable
    if(!state.post.filterEnable) return searchFilter
    return searchFilter && locationFilter
} )

function filterBySearch(search : string, data : Job) {
    if(!search) return true;
    const name = data.title?.toLowerCase();
    const tags = data.tags?.map(item => item.toLowerCase())
    return name?.includes(search.toLowerCase()) || tags?.includes(search.toLowerCase())
}

function filterByLocation(location : string, data : Job) {
    if(!location) return true;
    const name = data?.location?.toLowerCase();
    return name?.includes(location?.toLowerCase())
}