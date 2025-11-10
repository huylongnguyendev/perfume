
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import Loading from '@/components/Loading'

const AdminRoute = () => {
  const { user, loading, isAuthenticated } = useSelector((state: RootState) => state.auth)

  if (loading === "loading") return <Loading />
  // if (!isAuthenticated) return <Navigate to="/shop" replace />
  if (!user?.admin) return <Navigate to="/shop" replace />

  return <Outlet />
}

export default AdminRoute