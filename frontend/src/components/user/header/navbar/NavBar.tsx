import { listPage } from '@/lib/data'
import type { PageType } from '@/lib/types'
import { useEffect, useRef, useState } from 'react'
import NavItem from './NavItem'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { setIsOpenMenu } from '@/redux/toggleSlice'
import { cn } from '@/lib/utils'

const NavBar = () => {
  const isOpenMenu = useSelector((state: RootState) => state.toggle.isOpenMenu)
  const user = useSelector((state: RootState) => state.auth.user)
  const [pages, setPages] = useState<Array<PageType>>(listPage)
  const dispatch = useDispatch<AppDispatch>()
  const ref = useRef<HTMLElement>(null)

  const handleSetActivePage = (id: number) => {
    const newState = pages.map(item => item.id === id ? { ...item, isActive: true } : { ...item, isActive: false })
    setPages(newState)
    dispatch(setIsOpenMenu())
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node))
      dispatch(setIsOpenMenu())
  }

  useEffect(() => {
    if (!isOpenMenu) return
    window.addEventListener("mousedown", handleClickOutside)
    return () => window.removeEventListener("mousedown", handleClickOutside)
  }, [isOpenMenu])

  return (
    <>
      <nav ref={ref} className={cn("max-md:absolute max-md:bg-background max-md:w-11/12 max-md:shadow-md top-0 -left-[1000px] max-md:h-dvh p-4 transition-all duration-300 z-50", isOpenMenu && "left-0")}>
        <ul className="flex max-md:flex-col max-md:items-start gap-5 items-center">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => dispatch(setIsOpenMenu())}
            className="md:hidden rounded-full ms-auto"
          >
            <X />
          </Button>
          {
            pages.map((page, index) => {
              if (!user?.admin && index === listPage.length - 1) return null
              return (
                <NavItem
                  key={page.id}
                  page={page}
                  handleSetActivePage={handleSetActivePage}
                />
              )
            })
          }
        </ul>
      </nav>
    </>
  )
}

export default NavBar