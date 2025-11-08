import CartBill from '@/components/user/cart/CartBill'
import CartTable from '@/components/user/cart/CartTable'
import { useState } from 'react'
import PaymentSuccess from './payment/PaymentSuccess'

const CartPage = () => {
    const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false)
    return (
        <>
            {
                isPaymentSuccess && (<PaymentSuccess />)
                ||
                (
                    <div className="py-4 px-4 md:px-12 lg:px-16 mt-[88px] flex max-md:flex-col gap-5">
                        <div className="md:w-2/3">
                            <h2 className="text-lg font-semibold mb-4">Giỏ hàng</h2>
                            <CartTable />
                        </div>
                        <CartBill isPaymentSuccess={isPaymentSuccess} setIsPaymentSuccess ={setIsPaymentSuccess} />
                    </div>
                )
            }
        </>
    )
}

export default CartPage