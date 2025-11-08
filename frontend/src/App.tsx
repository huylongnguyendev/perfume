import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import UserLayout from './layouts/user/UserLayout'
import HomePage from './pages/user/HomePage'
import ProductPage from './pages/user/ProductPage'
import ProductDetail from './pages/user/ProductDetail'
import CartPage from './pages/user/CartPage'
import AdminLayout from './layouts/admin/AdminLayout'
import SignInPage from './pages/auth/SignInPage'
import SignUpPage from './pages/auth/SignUpPage'
import { toast, Toaster } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './redux/store'
import { useEffect } from 'react'
import { getProfile, refreshToken } from './redux/authSlice'
import { fetchCart } from './redux/cartSlice'
import IntroducePage from './pages/user/IntroducePage'
import AdminRoute from './pages/admin/AdminRoute'
import AdminPage from './pages/admin/AdminPage'
import ProductManager from './pages/admin/ProductManager'
import Cookies from 'js-cookie'


const App = () => {
  const { message, loading } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  useEffect(() => {
    const token = Cookies.get("accessToken")
    if (token) {
      dispatch(fetchCart())
      dispatch(getProfile())
    }
  }, [dispatch])

  useEffect(() => {
    if (loading === "success" && message)
      toast.success(message)
    if (loading === "failed" && message)
      toast.error(message)
  }, [message])

  return (
    <>
      <BrowserRouter>
        <Toaster richColors />
        <Routes>
          <Route path="/" element={<Navigate to="/shop" replace />} />

          <Route path="/shop" element={<UserLayout />}>
            <Route index element={<HomePage />} ></Route>
            <Route path="products" element={<ProductPage />} ></Route>
            <Route path="products/:id" element={<ProductDetail />} ></Route>
            <Route path="cart" element={<CartPage />} ></Route>
            <Route path="about-us" element={<IntroducePage />} ></Route>
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminPage />}></Route>
              <Route path="product-manager" element={<ProductManager />}  ></Route>
              <Route path="product-add" element={<HomePage />}  ></Route>
            </Route>
          </Route>

          <Route path="/signin" element={<SignInPage />} ></Route>
          <Route path="/signup" element={<SignUpPage />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App