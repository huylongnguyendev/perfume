import { SidebarTrigger } from '@/components/ui/sidebar'
import BreadCrumbSet from './BreadCrumbSet'

const AdminHeader = () => {
    return (
        <>
            <header className="flex items-center gap-2 mb-2 py-2 px-2.5 shadow-md fixed bg-background z-50 w-full">
                <SidebarTrigger className="cursor-pointer" />
                <BreadCrumbSet />
            </header>
        </>
    )
}

export default AdminHeader