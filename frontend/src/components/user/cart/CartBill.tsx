import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getProfile } from '@/redux/authSlice'
import { removeCartItem } from '@/redux/cartSlice'
import type { AppDispatch, RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

interface PaymentType {
    name: string
    value: string
    isActive: boolean
}

interface Props {
    isPaymentSuccess: boolean
    setIsPaymentSuccess: (result: boolean) => void
}

const CartBill = ({ isPaymentSuccess, setIsPaymentSuccess }: Props) => {
    const payments: Array<PaymentType> = [
        {
            name: "Thanh toán khi nhận hàng (COD)",
            value: "cash",
            isActive: true
        },
        {
            name: "Creadit Card",
            value: "creadit",
            isActive: false
        },
    ]
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
    const { items, message } = useSelector((state: RootState) => state.cart)
    const [pays, setPays] = useState<Array<PaymentType>>(payments)
    const dispatch = useDispatch<AppDispatch>()

    const [prices, setPrices] = useState({
        price: 0,
        fee: 0,
        voucher: 0,
    })
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        if (items.length > 0)
            setPrices({
                price: items.reduce((total, item) => item.selectedVolume.price * item.quantity + total, 0),
                fee: 30000,
                voucher: 0
            })
        else
            setPrices({
                price: items.reduce((total, item) => item.selectedVolume.price * item.quantity + total, 0),
                fee: 0,
                voucher: 0
            })
    }, [items])

    useEffect(() => {
        setTotal(prices.price + prices.fee - prices.voucher)
    }, [prices])

    useEffect(() => {
        dispatch(getProfile())
    }, [isAuthenticated])

    const handleSelect = (value: string) => {
        if (payments.length > 1) {
            const newPayments = payments.map(payment => payment.value === value ? { ...payment, isActive: true } : { ...payment, isActive: false })
            setPays(newPayments)
        }
    }

    const handleCheckout = async () => {
        if (items.length > 0) {
            try {
                await items.map(item => dispatch(removeCartItem({ id: item.productId._id, volume: item.selectedVolume.volume })))
                toast.success(message)
                setIsPaymentSuccess(!isPaymentSuccess)
            } catch (error: any) {
                toast.error(error?.message || "Thanh toán thất bại")
            }
        } else toast.error("Không có đơn hàng để thanh toán")
    }

    if (!user)
        return <Loading />

    return (
        <>
            <div className="p-4 rounded-2xl h-fit shadow-md md:w-1/3">
                <div className="border-b flex justify-baseline items-center gap-1 font-semibold py-4">
                    <h2>Đơn hàng:</h2>
                    <p>({items.length}) sản phẩm</p>
                </div>
                <div className="border-b font-semibold py-4 space-y-5">
                    <div>
                        <p>Tên người nhận:</p>
                        <p>{user?.fullName}</p>
                    </div>
                    <div>
                        <p>Số điện thoại người đặt:</p>
                        <p>{user?.phoneNumber}</p>
                    </div>
                </div>
                <div className="border-b font-semibold py-4">
                    <h2>Giao đến:</h2>
                    <p>{user?.address}</p>
                </div>
                <div className="border-b font-semibold py-4">
                    <h2>Phương thức thanh toán:</h2>
                    <div className="space-x-2">
                        {pays.map(payment => (
                            <Button key={payment.value}
                                variant="outline"
                                size="sm"
                                className={cn("cursor-pointer", payment.isActive && "border border-primary")}
                                onClick={() => handleSelect(payment.value)}
                            >
                                {payment.name}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="space-y-4 font-semibold py-2">
                    <div className="flex justify-between items-center">
                        <span>Tạm tính:</span>
                        <span>{prices.price.toLocaleString("vi-VN")}đ</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Phí vận chuyển:</span>
                        <span>{prices.fee.toLocaleString("vi-VN")}đ</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Voucher:</span>
                        <span>{prices.voucher.toLocaleString("vi-VN")}đ</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Tổng cộng:</span>
                        <span>{total.toLocaleString("vi-VN")}đ</span>
                    </div>
                </div>
                <Button className="cursor-pointer w-full"
                    onClick={handleCheckout}
                >Thanh toán</Button>
            </div>
        </>
    )
}

export default CartBill