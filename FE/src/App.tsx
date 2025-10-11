import Header from './layouts/Header'
import HomePage from './pages/HomePage'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProductPage from './pages/ProductPage'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App