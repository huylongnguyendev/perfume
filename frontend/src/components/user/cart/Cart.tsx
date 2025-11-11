import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { CreditCard, RotateCcw } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { cn } from '@/lib/utils'
import { setIsOpenCart } from '@/redux/toggleSlice'
import ProductCart from '@/components/product/ProductCart'
import Loading from '@/components/Loading'
import { useEffect, useRef } from 'react'

const Cart = () => {
  const isOpenCart = useSelector((state: RootState) => state.toggle.isOpenCart)
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading } = useSelector((state: RootState) => state.cart)
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutSide = (e: MouseEvent) => {
    if (!ref.current) return
    if (!ref.current.contains(e.target as Node))
      dispatch(setIsOpenCart())
  }

  useEffect(() => {
    if (!isOpenCart) return

    window.addEventListener("mousedown", handleClickOutSide)
    return () => window.removeEventListener("mousedown", handleClickOutSide)
  }, [isOpenCart])

  return (
    <>
      <div ref={ref} className={cn("absolute top-0 -right-[400px] w-96 bg-background h-dvh flex flex-col justify-between gap-4 p-4 shadow-lg transition-all duration-300 z-50", isOpenCart && "right-0")}>
        <h3 className="text-xl font-semibold w-fit mx-auto uppercase relative before:w-2/3 before:h-1 before:absolute before:bg-gradient-to-r before:from-primary/20 before:indigo-500 before:via-purple-500 before:to-pink-500 before:bottom-0 before:right-0 before:rounded-full py-1">Giỏ hàng</h3>
        <div className="h-full overflow-y-scroll">
          <ul className="p-2 border rounded-lg space-y-1">
            {
              loading === "loading" ? <li><Loading /></li> : !items || items.length === 0 ? (<li>Giỏ hàng trống</li>) :
                items.length > 0 && items && (
                  items.map((item, index) => (
                    <li key={index} className="p-2 bg-secondary rounded-lg">
                      <ProductCart item={item} />
                    </li>
                  ))
                )
            }
          </ul>
        </div>
        <div className="flex gap-1 mt-auto">
          <Button variant="secondary"
            onClick={() => dispatch(setIsOpenCart())}
            className="cursor-pointer w-1/2 gap-1" >
            <RotateCcw />
            <span>Tiếp tục mua hàng</span>
          </Button>
          <Button className="w-1/2 p-0" onClick={() => dispatch(setIsOpenCart())}>
            <Link to="/shop/cart" className="inline-flex size-full justify-center items-center gap-1">
              <CreditCard />
              <span>Thanh toán</span>
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Cart