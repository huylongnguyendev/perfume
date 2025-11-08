import { createSlice } from '@reduxjs/toolkit'

interface ProductSortType {
    sort: "default" | "newest" | "priceAsc" | "priceDesc"
}

const initialState = {
    sort: "default"

} satisfies ProductSortType as ProductSortType

const productSortSlice = createSlice({
    name: "productSort",
    initialState,
    reducers: {
        setSort: (state, action) => {
            state.sort = action.payload
        }
    }
})

const productSortReducer = productSortSlice.reducer
export default productSortReducer
export const { setSort } = productSortSlice.actions