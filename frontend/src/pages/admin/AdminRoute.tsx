
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import Loading from '@/components/Loading'

const AdminRoute = () => {
    const { user, loading } = useSelector((state: RootState) => state.auth)

    if (loading === "loading") return <Loading />
    if (!user) return <Navigate to="/signin" replace />
    if (!user?.admin) return <Navigate to="/shop" replace />

    return <Outlet />
}

export default AdminRoute