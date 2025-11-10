import type { BrandType } from '@/lib/types'
import { brandApi } from '@/services/product.api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface BrandState {
  items: Array<BrandType>
  loading: "idle" | "loading" | "success" | "failed"
}

export const fetchAllBrands = createAsyncThunk<Array<BrandType>, void, { rejectValue: string }>("/brands/getAllBrands", async (_, { rejectWithValue }) => {
  try {
    const res = await brandApi.getAllBrands()
    return res.data
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message)
    return rejectWithValue('Lỗi không xác định')
  }
})

export const createBrand = createAsyncThunk("/brands/createBrand", async (data: { name: string }, { rejectWithValue }) => {
  try {
    const res = await brandApi.createBrand(data)
    return res.data
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message)
    return rejectWithValue('Lỗi không xác định')
  }
})

const initialState = {
  items: [],
  loading: "idle"
} satisfies BrandState as BrandState

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBrands.pending, (state) => {
      state.loading = "loading"
    })
    builder.addCase(fetchAllBrands.fulfilled, (state, action) => {
      state.loading = "success"
      state.items = action.payload
    })
    builder.addCase(fetchAllBrands.rejected, (state) => {
      state.loading = "failed"
    })
    builder.addCase(createBrand.pending, (state) => {
      state.loading = "loading"
    })
    builder.addCase(createBrand.fulfilled, (state) => {
      state.loading = "success"
    })
    builder.addCase(createBrand.rejected, (state) => {
      state.loading = "failed"
    })
  }
})

const brandReducer = brandSlice.reducer
export default brandReducer