import { createSlice } from '@reduxjs/toolkit'

interface ToggleState {
    isOpenMenu: boolean
    isOpenFilter: boolean
}

const initialState = {
    isOpenMenu: false,
    isOpenFilter: false
} satisfies ToggleState as ToggleState

const toggleSlice = createSlice({
    name: "toggle",
    initialState,
    reducers: {
        setIsOpenMenu: (state) => {
            state.isOpenMenu = !state.isOpenMenu
        },
        setIsOpenFilter: (state) => {
            state.isOpenFilter = !state.isOpenFilter
        },
    }
})

const toggleReducer = toggleSlice.reducer
export const { setIsOpenMenu, setIsOpenFilter } = toggleSlice.actions
export default toggleReducer