import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './layouts/user/UserLayout'
import HomePage from './pages/user/HomePage'
import ProductPage from './pages/user/ProductPage'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} ></Route>
            <Route path="/products" element={<ProductPage />} ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App