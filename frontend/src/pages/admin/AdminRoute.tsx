
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import Loading from '@/components/Loading'

const AdminRoute = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth)

  if (loading === "loading") return <Loading />
  if (!user?.admin && loading === "success" || !user) return <Navigate to="/shop" replace />

  return <Outlet />
}

export default AdminRoute