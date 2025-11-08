import type { CartItemType, ProductType } from '@/lib/types'
import prd from '@/assets/prd_3.png'
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { addToCart, fetchCart } from '@/redux/cartSlice'
import { toast } from 'sonner'

interface Props {
    item: CartItemType
}

const ProductCart = ({ item }: Props) => {
    const items = useSelector((state: RootState) => state.productList.items)
    const message = useSelector((state: RootState) => state.cart.message)
    const dispatch = useDispatch<AppDispatch>()

    const handleIncreasement = async () => {
        const { product, currentQuantity, stock } = await quantityToAdd()

        if (currentQuantity < stock) {
            const newQuantity = currentQuantity + 1
            const addQuantity = newQuantity - currentQuantity
            try {
                await addNewQuantityToCart(product, addQuantity)
                toast.success(message)
            } catch (error: any) {
                toast.error(error?.message || "Thêm vào giỏ hàng thất bại")
            }
        }
    }
    const handleDecreasement = async () => {
        const { product, currentQuantity } = quantityToAdd()

        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1
            const addQuantity = newQuantity - currentQuantity
            try {
                await addNewQuantityToCart(product, addQuantity)
                toast.success(message)

            } catch (error: any) {
                toast.error(error?.message || "Thêm vào giỏ hàng thất bại")
            }
        }
    }

    const quantityToAdd = () => {
        const product = items.find(prd => prd._id === item.productId?._id)
        const stock = product?.volumes.find(vol => vol.size === item.selectedVolume.volume)?.onStock || 0
        const currentQuantity = item.quantity
        return { product, currentQuantity, stock }
    }

    const addNewQuantityToCart = async (product: ProductType | undefined, addQuantity: number) => {
        await dispatch(addToCart({
            productId: product?._id ?? item.productId._id,
            quantity: addQuantity,
            selectedVolume: item.selectedVolume
        })).unwrap()
        await dispatch(fetchCart())
    }

    return (
        <div className="flex gap-2">
            <div className="w-1/3 rounded-sm overflow-hidden">
                <img src={prd} alt={item.productId?.name} className="size-full object-cover" />
            </div>
            <div className="space-y-1.5">
                <div className="font-semibold">
                    <h3 className="text-sm line-clamp-2">{item.productId?.name}</h3>
                    <p className="text-xs text-muted-foreground">Dung tích: {item.selectedVolume?.volume}ml</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={handleDecreasement}
                        className="cursor-pointer"
                    >
                        <Minus className="size-3" />
                    </Button>
                    <p className="text-sm">{item.quantity}</p>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={handleIncreasement}
                        className="cursor-pointer"
                    >
                        <Plus className="size-3" />
                    </Button>
                </div>
                <p className="text-right text-primary font-semibold">{(item.quantity * item.selectedVolume.price).toLocaleString("vi-VN")}đ</p>
            </div>
        </div>
    )
}

export default ProductCart