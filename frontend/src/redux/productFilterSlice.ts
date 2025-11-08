import { createSlice } from '@reduxjs/toolkit'

interface ProductFilterState {
    search: string
    brand: string
    gender: string
    category: string
    minPrice: string
    maxPrice: string
}

const initialState = {
    search: "",
    brand: "",
    gender: "",
    category: "",
    minPrice: "",
    maxPrice: "",
} satisfies ProductFilterState as ProductFilterState

const productFilterSlice = createSlice({
    name: "productFilter",
    initialState,
    reducers: {
        setFilters: (state, action) => {
            Object.assign(state, action.payload)
        },
        resetFilters() {
            return initialState
        }
    }
})

const productFilterReducer = productFilterSlice.reducer
export default productFilterReducer
export const { setFilters, resetFilters } = productFilterSlice.actions