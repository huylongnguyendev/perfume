import { listPage } from '@/lib/data'
import type { PageType } from '@/lib/types'
import { useState } from 'react'
import NavItem from './NavItem'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { setIsOpenMenu } from '@/redux/toggleSlice'
import { cn } from '@/lib/utils'

const NavBar = () => {
  const isOpenMenu = useSelector((state: RootState) => state.toggle.isOpenMenu)
  const [pages, setPages] = useState<Array<PageType>>(listPage)
  const dispatch = useDispatch<AppDispatch>()

  const handleSetActivePage = (id: number) => {
    const newState = pages.map(item => item.id === id ? { ...item, isActive: true } : { ...item, isActive: false })
    setPages(newState)
  }
  return (
    <>
      <nav className={cn("max-md:absolute max-md:bg-background -top-[1000px] left-0 max-md:w-full max-md:h-dvh p-4 transition-all duration-300 z-50", isOpenMenu && "top-0")}>
        <ul className="flex max-md:flex-col gap-5 items-center">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => dispatch(setIsOpenMenu())}
            className="md:hidden rounded-full ms-auto"
          >
            <X />
          </Button>
          {
            pages.map(page => <NavItem key={page.id} page={page} handleSetActivePage={handleSetActivePage} />)
          }
        </ul>
      </nav>
    </>
  )
}

export default NavBar