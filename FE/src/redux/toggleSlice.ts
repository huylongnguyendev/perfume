import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
    menuToggle: boolean
    searchToggle: boolean
    cartToggle: boolean
}

const initialState = {
    menuToggle: false,
    searchToggle: false,
    cartToggle: true
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
        },
        switchCart: (state) => {
            state.cartToggle = !state.cartToggle
        },
    }
})

export const { switchMenu, switchSearch, switchCart } = toggleSlice.actions

const toggleReducer = toggleSlice.reducer
export default toggleReducer