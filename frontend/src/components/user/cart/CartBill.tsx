import { Button } from "@/components/ui/button"

const CartBill = () => {
    return (
        <>
            <div className="p-4 rounded-2xl shadow-md md:w-1/3">
                <div className="border-b flex justify-baseline items-center gap-1 font-semibold py-4">
                    <h2 className="text-lg" >Đơn hàng:</h2>
                    <p>(1) sản phẩm</p>
                </div>
                <div className="border-b font-semibold py-4 space-y-5">
                    <div>
                        <p>Số điện thoại người đặt:</p>
                        <p>0123456789</p>
                    </div>
                    <div>
                        <p>Số điện thoại người nhận:</p>
                        <p>0123456789</p>
                    </div>
                    
                </div>
                <div className="border-b font-semibold py-4">
                    <h2 className="text-lg">Giao đến:</h2>
                    <p>123 Bui Van Hoa Street, Bien Hoa, Dong Nai</p>
                </div>
                <div className="border-b font-semibold py-4">
                    <h2 className="text-lg">Phương thức thanh toán:</h2>
                    <p>Tiền mặt</p>
                </div>
                <div className="space-y-4 font-semibold py-2">
                    <div className="flex justify-between items-center">
                        <span>Giá:</span>
                        <span>1000000</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Phí vận chuyển:</span>
                        <span>1000000</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Voucher:</span>
                        <span>1000000</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Tổng cộng:</span>
                        <span>1000000</span>
                    </div>
                </div>
                <Button className="cursor-pointer w-full">Thanh toán</Button>
            </div>
        </>
    )
}

export default CartBill