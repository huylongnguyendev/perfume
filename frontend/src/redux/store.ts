import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from './toggleSlice'
import authReducer from './authSlice'
import productListReducer from './productListSlice'
import productFilterReducer from './productFilterSlice'
import productReducer from './productSlice'


export const store = configureStore({
    reducer: {
        toggle: toggleReducer,
        auth: authReducer,
        productList: productListReducer,
        productFilter: productFilterReducer,
        product: productReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch