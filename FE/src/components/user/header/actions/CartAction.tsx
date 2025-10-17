import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

const CartAction = () => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer rounded-full relative"
      >
        <Badge variant="destructive" className="absolute -top-1.5 -right-1 px-1 min-w-5 h-5 tabular-nums rounded-full text-xs">1</Badge>
        <ShoppingCart />
      </Button>
    </>
  )
}

export default CartAction