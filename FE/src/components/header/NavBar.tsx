import { PageList } from '@/lib/data'
import type { PageType } from '@/lib/types'
import { useState } from 'react'
import NavItem from './NavItem'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { cn } from '@/lib/utils'
import { switchMenu } from '@/redux/toggleSlice'
import Auth from './Auth'

const NavBar = () => {
    const [pages, setPages] = useState<Array<PageType>>(PageList)
    const toggleMenu = useSelector((state: RootState) => state.toggleSwitch.menuToggle)
    const dispatch = useDispatch<AppDispatch>()
    const handleActivePage = (id: number) => {
        const setActivePages = pages.map(page => page.id === id ? { ...page, isActive: true } : { ...page, isActive: false })
        setPages(setActivePages)
    }

    return (
        <>
            <nav className={cn("absolute lg:static max-lg:bg-background max-lg:p-4 top-0 -right-full max-lg:w-11/12 max-lg:h-dvh max-lg:shadow-md z-50 transition-all duration-300", toggleMenu && "right-0")}>
                <ul className="flex max-lg:flex-col h-full gap-4 text-lg max-lg:space-y-2 justify-between-end lg:items-center">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => dispatch(switchMenu())}
                        className="cursor-pointer rounded-full ms-auto lg:hidden"
                    >
                        <X className="text-red-500" />
                    </Button>
                    {
                        pages.map(page => <NavItem key={page.id} page={page} handleActivePage={handleActivePage} />)
                    }
                    <Auth />
                </ul>
            </nav>
        </>
    )
}

export default NavBar