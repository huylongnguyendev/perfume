import type { ProductAddType, ProductType } from '@/lib/types'
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

export const createNewProduct = createAsyncThunk("products/createNew", async (data: ProductAddType, { rejectWithValue }) => {
  try {
    const res = await productApi.createProduct(data)
    return res.data
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message)
    return rejectWithValue('Lỗi không xác định')
  }
})

export const updateProduct = createAsyncThunk("products/update", async (payload: {id: string, data: ProductAddType}, { rejectWithValue }) => {
  try {
    const res = await productApi.updateProduct(payload.id, payload.data)
    return res.data
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message)
    return rejectWithValue('Lỗi không xác định')
  }
})

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id: string, { rejectWithValue }) => {
  try {
    const res = await productApi.deleteProduct(id)
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
      .addCase(createNewProduct.pending, (state) => {
        state.loading = "loading"
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.loading = "success"
        state.item = action.payload
      })
      .addCase(createNewProduct.rejected, (state) => {
        state.loading = "failed"
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = "loading"
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = "success"
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = "failed"
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = "loading"
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = "success"
      })
      .addCase(updateProduct.rejected, (state) => {
        state.loading = "failed"
      })
  }
})

const productReducer = productSlice.reducer
export default productReducer