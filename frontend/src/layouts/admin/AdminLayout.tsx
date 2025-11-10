import { SidebarProvider } from '@/components/ui/sidebar'
import AdminSideBar from '@/pages/admin/AdminSideBar'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'
import type { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { cn } from '@/lib/utils'
const AdminLayout = () => {
  const isOpenAddProduct = useSelector((state: RootState) => state.toggle.isOpenAddProduct)
  return (
    <>
      <SidebarProvider className={cn("", isOpenAddProduct && "before:w-full before:h-dvh before:top-0 before:-left-0 before:fixed before:bg-black/50 before:z-10")}>
        <AdminSideBar />
        <main className="w-full">
          <AdminHeader />
          <div className="mt-12">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>

    </>
  )
}

export default AdminLayout