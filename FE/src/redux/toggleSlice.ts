import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
    menuToggle: boolean
    searchToggle: boolean
}

const initialState = {
    menuToggle: false,
    searchToggle: false
} satisfies ToggleState as ToggleState

const toggleSlice = createSlice({
    name: "toggleSwitch",
    initialState,
    reducers: {
        switchMenu: (state) => {
            state.menuToggle = !state.menuToggle
        },
        switchSearch: (state) => {
            state.searchToggle = !state.searchToggle
        }
    }
})

export const { switchMenu, switchSearch } = toggleSlice.actions

const toggleReducer = toggleSlice.reducer
export default toggleReducer