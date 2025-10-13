import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { switchCart } from '@/redux/toggleSlice'
import EmptyLayout from '@/layouts/EmptyLayout'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import  CartList  from '@/layouts/CartList'

const CartDrawser = () => {
    const toggleCart = useSelector((state: RootState) => state.toggleSwitch.cartToggle)
    const dispatch = useDispatch<AppDispatch>()
    const cartNumber = 1
    return (
        <>
            <div className={cn("absolute flex flex-col gap-4 bg-background p-4 shadow-md w-11/12 md:w-1/2 xl:w-1/3 top-0 -right-full h-dvh overflow-hidden z-50 transition-all duration-300", toggleCart && "right-0")}>
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => dispatch(switchCart())}
                    className="cursor-pointer rounded-full ms-auto"
                >
                    <X />
                </Button>

                <h2 className="font-semibold text-xl">Giỏ hàng</h2>
                <div className="w-full rounded-lg border overflow-hidden overflow-y-scroll">
                    {
                        cartNumber ?
                            <CartList /> :
                            <EmptyLayout />
                    }
                </div>
                <Button
                    size="lg"
                    className={cn("pointer-events-none opacity-50 mt-auto", cartNumber && "opacity-100 pointer-events-auto")}>
                    <Link to="" className="inline-flex size-full items-center justify-center">Thanh toán</Link>
                </Button>
            </div>
        </>
    )
}

export default CartDrawser