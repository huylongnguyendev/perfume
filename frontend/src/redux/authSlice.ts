import { createSlice } from '@reduxjs/toolkit'

const initialState ={}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
    }
})

const authReducer = authSlice.reducer

export default authReducer