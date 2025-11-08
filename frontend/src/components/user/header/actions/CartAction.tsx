import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { AppDispatch, RootState } from '@/redux/store'
import { setIsOpenCart } from '@/redux/toggleSlice'
import { ShoppingCart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

const CartAction = () => {
  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector((state: RootState) => state.cart.items)
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => dispatch(setIsOpenCart())}
        className="cursor-pointer rounded-full relative"
      >
        <Badge variant="destructive" className="absolute -top-1.5 -right-1 px-1 min-w-5 h-5 tabular-nums rounded-full text-xs">{items.length}</Badge>
        <ShoppingCart />
      </Button>
    </>
  )
}

export default CartAction