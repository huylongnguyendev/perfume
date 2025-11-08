import Logo from '@/components/Logo'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar'
import type { CrumbType } from '@/lib/types'
import type { AppDispatch } from '@/redux/store'
import { ChartArea, Home, SquareChartGantt } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCrumbs, setResetBreadCrumb } from '@/redux/breadCrumbSlice'

interface ItemType {
    title: string
    value: string
    url: string
    icon: React.ElementType
    children?: Array<ItemType>
}

const items: Array<ItemType> = [
    {
        title: "Dashboard",
        value: "dashboard",
        url: "/admin",
        icon: ChartArea,
    },
    {
        title: "Quản lý",
        value: "product-manager",
        url: "/admin/product-manager",
        icon: SquareChartGantt,
        children: [
            {
                title: "Quản lý",
                value: "product-add",
                url: "/admin/product-add",
                icon: Home,
            }
        ]
    },
]


const AdminSideBar = () => {
    const dispatch = useDispatch<AppDispatch>()

    const handleClickItem = (item: ItemType) => {
        if (item.value === "dashboard") {
            dispatch(setResetBreadCrumb())
            return
        }

        const { title, icon, children, ...rest } = item
        const newCrumb: CrumbType = { ...rest, name: item.title }
        dispatch(setCrumbs([newCrumb]))
    }

    const handleClickChild = (item: ItemType, children: ItemType) => {
        const { parent, child } = getNewCrumbs(item, children)
        dispatch(setCrumbs([parent, child]))
    }

    const getNewCrumbs = (item: ItemType, children: ItemType) => {
        const parent: Record<string, any> = {}
        const child: Record<string, any> = {}
        if (item) {
            const { title, icon, ...restParent } = item
            Object.assign(parent, restParent)
        }
        if (children) {
            const { title, icon, ...restChild } = children
            Object.assign(child, restChild)
        }

        return { parent, child }
    }

    return (
        <>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            <Logo />
                        </SidebarGroupLabel>
                        <SidebarGroupContent className="mt-5">
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={item.url} onClick={() => handleClickItem(item)} className="inline-flex size-full items-center" >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                            <SidebarMenuSub>
                                                {
                                                    item.children && item.children.map(child => (
                                                        <SidebarMenuSubItem key={child.title}>
                                                            <SidebarMenuSubButton asChild>
                                                                <Link to={child.url} onClick={() => handleClickChild(item, child)} className="inline-flex size-full items-center" >
                                                                    <child.icon />
                                                                    <span>{child.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))
                                                }
                                            </SidebarMenuSub>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </>
    )
}
export default AdminSideBar