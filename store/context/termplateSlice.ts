import { PayloadAction, createSlice } from "@reduxjs/toolkit"


type initState = {
    
    current : any,
    data : any[],
}

const initialState : initState = {
    current : {},
    data : [],
}

const templateReducer = createSlice({
    name: "template",
    initialState,
    reducers: {
        setCurrent(state, action: PayloadAction<any>) {
            state.current = action.payload
        },
        setData(state, action: PayloadAction<any[]>) {
            state.data = action.payload
        },
    }
})

export const TemplateActions = templateReducer.actions
export default templateReducer.reducer

