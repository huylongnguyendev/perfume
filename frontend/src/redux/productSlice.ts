import type { ProductType } from '@/lib/types'
import { productApi } from '@/services/product.api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fecthOneProduct = createAsyncThunk("products/getOneProduct", async (id: string, { rejectWithValue }) => {
    try {
        const res = await productApi.getOneProduct(id)
        return res.data
    } catch (error) {
        if (error instanceof Error) return rejectWithValue(error.message)
        return rejectWithValue('Lỗi không xác định')
    }

})

interface ProductState {
    item: ProductType | null
    loading: "idle" | "loading" | "success" | "failed"
}

const initialState = {
    item: null,
    loading: "idle"
} satisfies ProductState as ProductState

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fecthOneProduct.pending, (state) => {
                state.loading = "loading"
            })
            .addCase(fecthOneProduct.fulfilled, (state, action) => {
                state.loading = "success"
                state.item = action.payload
            })
            .addCase(fecthOneProduct.rejected, (state) => {
                state.loading = "failed"
            })
    }
})

const productReducer = productSlice.reducer
export default productReducer