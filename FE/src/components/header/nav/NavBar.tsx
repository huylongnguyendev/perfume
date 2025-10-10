import { PageList } from '@/lib/data'
import { useState } from 'react'
import NavItem from './NavItem'
import type { PageType } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { switchMenu } from '@/redux/toggleSlice'
import { cn } from '@/lib/utils'


const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const toggleMenu = useSelector((state: RootState) => state.toggleSwitch.menuToggle)
  const [pages, setPages] = useState<Array<PageType>>(PageList)

  const handleActivePage = (id: number) => {
    const newActive = pages.map(page => page.id === id ? { ...page, isActive: true } : { ...page, isActive: false })
    setPages(newActive)
  }

  return (
    <>
      <nav className={cn("absolute max-md:w-11/12 top-0 -right-11/12 max-md:h-dvh max-md:shadow-md bg-background max-md:p-4 max-md:space-y-5 md:static transition-all duration-300", toggleMenu && "right-0")}>
        <div className="w-full flex justify-end items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => dispatch(switchMenu())}
            className="rounded-full text-red-500 md:hidden"
          >
            <X />
          </Button>
        </div>
        <ul className='md:flex md:items-center md:gap-5'>
          {
            pages.map(page => <NavItem key={page.id} pages={page} handleActivePage={handleActivePage} />)
          }
        </ul>
      </nav>
    </>
  )
}

export default NavBar