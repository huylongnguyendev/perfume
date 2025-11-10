import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { signOut } from '@/redux/authSlice'
import { clearCart } from '@/redux/cartSlice'
import type { AppDispatch, RootState } from '@/redux/store'
import { LogOut, Package, Settings, User } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const UserAction = () => {
  const { isSignIn, user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const [isShow, setIsShow] = useState<boolean>(false)

  const userOptions = [
    {
      name: "Đơn hàng",
      icon: Package,
      url: "/order-list"
    },
    {
      name: "Cài đặt",
      icon: Settings,
      url: "/setting-account"
    },
    {
      name: "Đăng xuất",
      icon: LogOut,
      url: ""
    },
  ]

  const handleActive = (active: boolean) => {
    setIsShow(active)
  }

  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await dispatch(signOut()).unwrap()
      dispatch(clearCart())
      toast.success("Đăng xuất thành công!")
      navigate("/signin")
    } catch (error: any) {
      toast.error(error)
    }
  }

  const getNameIcon = () => {
    const parts = user?.fullName.split(" ")

    if (!parts) return ""

    if (parts.length === 1)
      return parts[0].slice(0, 2)
    if (parts.length === 2)
      return parts.map(name => name.charAt(0)).join("")
    else return (parts[1].charAt(0) + parts[parts.length - 1].charAt(0))
  }

  const nameIcon: string | undefined = getNameIcon()?.toString().toUpperCase()


  return (
    <>
      {
        isSignIn && (
          <div className="relative size-8 inline-flex items-center justify-center group">
            <Button
              size="icon-sm"
              onClick={() => handleActive(true)}
              className="cursor-pointer rounded-full relative group text-xs"
            >
              {
                !nameIcon && <User /> || nameIcon
              }
            </Button>
            <ul className={cn("absolute bg-background top-10 shadow-md rounded-md p-1 flex flex-col right-0 w-40 opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible", isShow && "opacity-100 visible")}>
              {
                userOptions.map(item => (
                  <li key={item.name}
                    onClick={() => handleActive(false)}
                    className="cursor-pointer p-1 w-full transition-all duration-300 rounded-sm hover:bg-secondary hover:text-primary font-semibold"
                  >
                    {item.name === "Đăng xuất" && (
                      <div
                        onClick={handleSignOut}
                        className="inline-flex items-center w-full gap-2">
                        <item.icon className="size-4" />
                        <span>{item.name}</span>
                      </div>
                    )
                      || (
                        <Link to={item.url}
                          className="size-full inline-flex items-center gap-2"
                        >
                          <item.icon className="size-4" />
                          <span>{item.name}</span>
                        </Link>
                      )
                    }
                  </li>
                ))
              }
            </ul>
          </div>
        )
        || (
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer rounded-full"
          >
            <Link to="/signin" className="inline-flex size-full items-center justify-center">
              <User />
            </Link>
          </Button>
        )
      }
    </>
  )
}

export default UserAction