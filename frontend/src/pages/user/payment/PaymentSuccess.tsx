import { Button } from '@/components/ui/button'
import { TextReveal } from '@/components/ui/text-reveal'
import { cn } from '@/lib/utils'
import { Package, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
    return (
        <>
            <div className="background-gradient px-4 md:px-12 lg:px-16">
                <div className="flex flex-col items-center justify-center gap-5 text-center h-dvh">
                    <TextReveal
                        className={cn(
                            "bg-primary from-foreground to-primary via-rose-200 bg-clip-text text-2xl font-bold text-transparent dark:bg-gradient-to-b"
                        )}
                        from="bottom"
                        split="letter"
                    >
                        Mua hàng thành công!
                    </TextReveal>
                    <div className="space-x-2">
                        <Button variant="secondary" className="cursor-pointer">
                            <Package />
                            <span>Xem đơn hàng</span>
                        </Button>
                        <Button className="cursor-pointer">
                            <Link to="/products" className="size-full inline-flex justify-center items-center gap-2">
                                <ShoppingCart />
                                <span>Tiếp tục mua hàng</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentSuccess