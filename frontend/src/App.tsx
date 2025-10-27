import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './layouts/user/UserLayout'
import HomePage from './pages/user/HomePage'
import ProductPage from './pages/user/ProductPage'
import ProductDetail from './pages/user/ProductDetail'
import CartPage from './pages/user/CartPage'
import AdminLayout from './layouts/admin/AdminLayout'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} ></Route>
            <Route path="/products" element={<ProductPage />} ></Route>
            <Route path="/products/:id" element={<ProductDetail />} ></Route>
            <Route path="/cart" element={<CartPage />} ></Route>
          </Route>
          <Route path="/admin" element={<AdminLayout />} >
          </Route>
          <Route path="/signin" element={<SignInPage />} ></Route>
          <Route path="/signup" element={<SignUpPage />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App