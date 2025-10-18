import { Button } from '@/components/ui/button'
import ProductCart from '../product/ProductCart'
import { Link } from 'react-router-dom'
import { CreditCard } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { cn } from '@/lib/utils'
import { setIsOpenCart } from '@/redux/toggleSlice'

const Cart = () => {
  const isOpenCart = useSelector((state: RootState) => state.toggle.isOpenCart)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <>
      <div className={cn("absolute top-0 -right-full w-96 bg-background h-dvh flex flex-col justify-between gap-4 p-4 shadow-lg transition-all duration-300", isOpenCart && "right-0")}>
        <h3 className="text-xl font-semibold w-fit mx-auto uppercase relative before:w-2/3 before:h-1 before:absolute before:bg-gradient-to-r before:from-primary/20 before:indigo-500 before:via-purple-500 before:to-pink-500 before:bottom-0 before:right-0 before:rounded-full py-1">Giỏ hàng</h3>
        <div className="h-full overflow-y-scroll">
          <ul className="p-4 border rounded-lg space-y-1">
            <li className="p-1 bg-secondary rounded-lg"><ProductCart /> </li>
            <li className="p-1 bg-secondary rounded-lg"><ProductCart /> </li>
            <li className="p-1 bg-secondary rounded-lg"><ProductCart /> </li>
            <li className="p-1 bg-secondary rounded-lg"><ProductCart /> </li>
          </ul>
        </div>
        <div className="flex gap-1 mt-auto">
          <Button variant="secondary"
            onClick={()=>dispatch(setIsOpenCart())}
            className="cursor-pointer w-1/2" >Tiếp tục mua hàng</Button>
          <Button className="w-1/2">
            <Link to="/cart" className="inline-flex items-center gap-1">
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