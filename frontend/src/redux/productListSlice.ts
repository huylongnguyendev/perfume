import type { ProductType, ProductListResponse } from '@/lib/types'
import { productApi } from '@/services/product.api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchAllProduct = createAsyncThunk<ProductListResponse, Record<string, any>, { rejectValue: string }>("products/getAllProducts", async (params, { rejectWithValue }) => {
    try {
        const res = await productApi.getAllProducts(params)
        return res.data
    } catch (error) {
        if (error instanceof Error) return rejectWithValue(error.message)
        return rejectWithValue('Lỗi không xác định')
    }
})

interface ProductListState {
    items: Array<ProductType>
    page: number
    totalPages: number
    totalItems: number
    loading: "idle" | "loading" | "success" | "failed"
}

const initialState = {
    items: [],
    page: 1,
    totalPages: 1,
    totalItems: 0,
    loading: "idle"
} satisfies ProductListState as ProductListState

const productListSlice = createSlice({
    name: "productList",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProduct.pending, (state) => {
                state.loading = "loading"
            })
            .addCase(fetchAllProduct.fulfilled, (state, action) => {
                state.loading = "success"
                state.items = action.payload.products
                state.totalPages = action.payload.totalPages
                state.totalItems = action.payload.totalItems
            })
            .addCase(fetchAllProduct.rejected, (state) => {
                state.loading = "failed"
            })
    }
})

const productListReducer = productListSlice.reducer
export default productListReducer
export const { setPage } = productListSlice.actions