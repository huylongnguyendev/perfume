import { SidebarProvider } from '@/components/ui/sidebar'
import AdminSideBar from '@/pages/admin/AdminSideBar'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <>
            <SidebarProvider>
                <AdminSideBar />
                <main className="w-full">
                    <AdminHeader />
                    <Outlet />
                </main>
            </SidebarProvider>
        </>
    )
}

export default AdminLayout