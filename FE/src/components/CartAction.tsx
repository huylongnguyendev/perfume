import { ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/redux/store'
import { switchCart } from '@/redux/toggleSlice'

const CartAction = () => {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <>
            <Button
                variant="outline"
                size="icon"
                onClick={()=>dispatch(switchCart())}
                className="cursor-pointer rounded-full relative"
            >
                <Badge variant="destructive" className="rounded-full min-w-5 px-1 absolute -top-1.5 -right-1.5 tabular-nums">1</Badge>
                <ShoppingCart />
            </Button>
        </>
    )
}

export default CartAction