import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

const CartAction = () => {
    return (
        <>
            <Button
                variant="outline"
                size="icon"
                className="cursor-pointer rounded-full relative"
            >
                <Badge
                    variant="destructive"
                    className="absolute -top-1.5 -right-1.5 h-5 min-w-5 rounded-full px-1 tabular-nums"
                >0
                </Badge>
                <ShoppingCart />
            </Button>
        </>
    )
}

export default CartAction