import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import User from './layouts/user-layout/User'


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<User />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App