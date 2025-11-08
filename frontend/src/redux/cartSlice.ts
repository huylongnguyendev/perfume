import type { CartItemType, CartRequestType, CartResponse } from '@/lib/types'
import { cartApi } from '@/services/cart.api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface CartState {
    items: Array<CartItemType> | []
    message: string | null
    loading: "idle" | "loading" | "success" | "failed"
}

export const fetchCart = createAsyncThunk<CartResponse, void, { rejectValue: string }>("cart/getCart", async (_, { rejectWithValue }) => {
    try {
        const res = await cartApi.getCart()
        return res.data
    } catch (error: any) {
        const message = error.response?.data?.message || "Tìm kiếm giỏ hàng thất bại"
        return rejectWithValue(message)
    }
})
export const addToCart = createAsyncThunk<CartResponse, CartRequestType, { rejectValue: string }>("cart/addToCart", async (data: CartRequestType, { rejectWithValue }) => {
    try {
        const res = await cartApi.addToCart(data)
        return res.data
    } catch (error: any) {
        const message = error.response?.data?.message || "Thêm sản phẩm thất bại"
        return rejectWithValue(message)
    }
})

export const removeCartItem = createAsyncThunk("cart/remove", async ({ id, volume }: { id: string, volume: number }, { rejectWithValue }) => {
    try {
        const res = await cartApi.removeItem(id, volume)
        return res.data
    } catch (error: any) {
        const message = error.response?.data?.message || "Xóa sản phẩm thất bại"
        return rejectWithValue(message)
    }
})

const initialState = {
    items: [],
    message: null,
    loading: "idle"
} satisfies CartState as CartState

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = "loading"
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = "success"
                state.items = action.payload.cart.items || []

            })
            .addCase(fetchCart.rejected, (state) => {
                state.loading = "success"
            })

            .addCase(addToCart.pending, (state) => {
                state.loading = "loading"
                state.message = "Đang xử lý..."
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = "success"
                state.message = action.payload.message
                console.log(state.message)
                state.items = action.payload.cart.items || []
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = "success"
                state.message = action.payload || "Tìm kiếm giỏ hàng thất bại"
            })
            .addCase(removeCartItem.pending, (state) => {
                state.loading = "loading"
                state.message = "Đang xử lý..."
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.loading = "success"
                state.message = action.payload.message
                state.items = action.payload.cart.items || []
            })
            .addCase(removeCartItem.rejected, (state) => {
                state.loading = "success"
                state.message = "Xóa sản phẩm thất bại"
            })
    }
})

const cartReducer = cartSlice.reducer
export default cartReducer