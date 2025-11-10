import type { User, UserResponse, UserSignIn, UserSignUp } from '@/lib/types'
import { authApi } from '@/services/auth.api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

export const signIn = createAsyncThunk<UserResponse, UserSignIn, { rejectValue: string }>("auth/signin", async (data: UserSignIn, { rejectWithValue }) => {
  try {
    const res = await authApi.signIn(data)
    return res.data
  } catch (error: any) {
    const message = error.response?.data?.message || "Đăng nhập thất bại"
    return rejectWithValue(message)

  }
})

export const signUp = createAsyncThunk<string, UserSignUp, { rejectValue: string }>("auth/signup", async (data: UserSignUp, { rejectWithValue }) => {
  try {
    const res = await authApi.signUp(data)
    return res.data
  } catch (error: any) {
    const message = error.response?.data?.message || "Đăng nhập thất bại"
    return rejectWithValue(message)
  }
})

export const signOut = createAsyncThunk("auth/signout", async (_, { rejectWithValue }) => {
  try {
    const res = await authApi.signOut()
    return res.data
  } catch (error: any) {
    const message = error.response?.data?.message || "Đăng nhập thất bại"
    return rejectWithValue(message)
  }
})

export const getProfile = createAsyncThunk("auth/user/profile", async (_, { rejectWithValue }) => {
  try {
    const res = await authApi.getProfile()
    return res.data
  } catch (error: any) {
    const message = error.response?.data?.message || "Đăng nhập thất bại"
    return rejectWithValue(message)
  }
})

export const refreshToken = createAsyncThunk<UserResponse, void, { rejectValue: string }>("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const res = await authApi.refreshToken()
    const { accessToken } = res.data

    Cookies.set('accessToken', accessToken, {
      expires: 1,
      secure: true,
      sameSite: 'Strict'
    })

    return res.data
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Phiên đăng nhập đã hết hạn"
    return rejectWithValue(message)
  }
})

export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async (_, thunkAPI): Promise<User | null> => {
    try {
      const refreshTokenCookie = Cookies.get("refreshToken")
      if (!refreshTokenCookie) return null

      await thunkAPI.dispatch(refreshToken()).unwrap()
      const profileResponse = await thunkAPI.dispatch(getProfile()).unwrap()
      return profileResponse.user // ✅ chỉ trả về user
    } catch (err) {
      console.error('Lỗi khi khởi tạo phiên:', err)
      return null
    }
  }
)



interface AuthState {
  user: User | null
  message: string | null
  accessToken: string | null
  isSignIn: boolean
  isAuthenticated: boolean
  loading: "idle" | "loading" | "success" | "failed"
}

const initialState = {
  user: null,
  message: null,
  accessToken: null,
  isSignIn: false,
  isAuthenticated: false,
  loading: "idle"
} satisfies AuthState as AuthState

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = "loading"
        state.message = "Đang đăng nhập..."
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = "success"
        state.isSignIn = true
        state.accessToken = action.payload.accessToken
        state.isAuthenticated = true
        state.user = action.payload.user
        state.message = action.payload.message
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = "failed"
        state.isAuthenticated = false
        state.message = action.payload || "Đăng nhập thất bại"
      })
      .addCase(signUp.pending, (state) => {
        state.loading = "loading"
        state.message = "Đang xử lý..."
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = "success"
        state.message = "Đăng ký thành công"
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = "failed"
        state.message = action.payload || "Đăng ký thất bại"
      })
      .addCase(signOut.pending, (state) => {
        state.loading = "loading"
        state.message = "Đang xử lý..."
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = "success"
        state.message = "Đăng xuất thành công"
        state.isSignIn = false
        state.accessToken = null
        state.user = null
      })
      .addCase(signOut.rejected, (state) => {
        state.loading = "failed"
        state.isAuthenticated = false
        state.message = "Đăng xuất thất bại"
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = "loading"
        state.message = "Đang xử lý..."
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = "success"
        state.isSignIn = true
        state.isAuthenticated = true
        state.accessToken = action.payload.accessToken
        state.user = action.payload.user

        if (state.isSignIn)
          state.message = "Khôi phục phiên đăng nhập thành công"
      })
      .addCase(refreshToken.rejected, (state) => {
        state.loading = "failed"
        state.isSignIn = false
        state.accessToken = null
        state.user = null
        state.isAuthenticated = false
        if (state.isSignIn)
          state.message = "Không thể khôi phục phiên đăng nhập"
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = "loading"
        state.message = "Đang xử lý..."
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = "success"
        state.user = action.payload.user
      })
      .addCase(getProfile.rejected, (state) => {
        state.loading = "failed"
        state.user = null
        state.isAuthenticated = false
        state.message = "Không thể lấy thông tin người dùng"
      })
      .addCase(initializeAuth.pending, (state) => {
        state.loading = "loading"
        state.message = "Đang xử lý..."
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = "success"
        if (action.payload) {
          state.user = action.payload
          state.isAuthenticated = true
        } else {
          state.user = null
          state.isAuthenticated = false
        }
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.loading = "failed"
        state.user = null
        state.isAuthenticated = false
        state.message = "Không thể lấy thông tin người dùng"
      })
  }
})

const authReducer = authSlice.reducer
export default authReducer