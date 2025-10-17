import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const UserLayout = () => {
  return (
    <>
      {/* header */}
      <Header />
      {/* content */}
      <Outlet />
      {/* footer */}
      <Footer />
    </>
  )
}

export default UserLayout