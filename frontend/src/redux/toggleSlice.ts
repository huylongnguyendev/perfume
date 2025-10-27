import { createSlice } from '@reduxjs/toolkit'

interface ToggleState {
    isOpenMenu: boolean
    isOpenFilter: boolean
    isOpenCart: boolean
}

const initialState = {
    isOpenMenu: false,
    isOpenFilter: false,
    isOpenCart: false,
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
        setIsOpenCart: (state) => {
            state.isOpenCart = !state.isOpenCart
        },
    }
})

const toggleReducer = toggleSlice.reducer
export const { setIsOpenMenu, setIsOpenFilter, setIsOpenCart } = toggleSlice.actions
export default toggleReducer