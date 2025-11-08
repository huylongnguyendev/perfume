import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProductType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { addToCart } from '@/redux/cartSlice'
import type { AppDispatch, RootState } from '@/redux/store'
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

interface Props {
    item: ProductType
}

const InfoDetail = ({ item }: Props) => {
    const [quantity, setQuantity] = useState<number>(1)
    const message = useSelector((state: RootState) => state.cart.message)
    const dispatch = useDispatch<AppDispatch>()

    const defaultVol = item.volumes?.[0]

    const [size, setSize] = useState<number>(defaultVol?.size ?? 0)
    const [priceOrig, setPriceOrig] = useState<number>(defaultVol?.priceOrig ?? 0)
    const [price, setPrice] = useState<number>(defaultVol?.price ?? 0)
    const [discount, setDiscount] = useState<number>(defaultVol?.discount ?? 0)
    const [stock, setStock] = useState<number>(defaultVol?.onStock ?? 0)

    const handleActiveVol = (sku: string) => {
        const selectVol = item.volumes.filter(vol => vol.sku === sku)[0]

        setSize(selectVol.size)
        setPriceOrig(selectVol.priceOrig)
        setPrice(selectVol.price)
        setDiscount(selectVol.discount)
        setStock(selectVol.onStock)
    }

    const handleDecrement = () => {
        if (quantity > 1)
            setQuantity(prev => prev - 1)
    }

    const handleIncrement = () => {
        if (stock && stock > 0 && quantity < stock)
            setQuantity(prev => prev + 1)
    }

    const handleAddToCart = async () => {
        try {
            await (dispatch(addToCart({
                productId: item._id,
                quantity,
                selectedVolume: {
                    discount,
                    price,
                    priceOrig,
                    volume: size
                }
            })))
            toast.success(message ?? "Thêm sản phẩm vào giỏ hàng thành công")
        } catch (error: any) {
            toast.error(error?.message ?? "Thêm vào giỏ hàng thất bại")
        }
    }

    return (
        <>
            <div className="shadow-md p-4 md:w-1/2 rounded-lg space-y-5">
                <div className="flex gap-2">
                    <h2 className="text-xl font-semibold">{item?.name}</h2>
                    {
                        discount > 0 && (
                            <Badge
                                variant="destructive"
                            >
                                -{discount}%
                            </Badge>
                        )
                    }
                </div>
                <div className="leading-5 text-muted-foreground">
                    <p>{item?.category}</p>
                    <p>Giới tính: {item?.gender}</p>
                    <p>Kho hàng: {stock > 0 && stock || "Tạm hết hàng"}</p>
                </div>

                <div className="font-semibold">
                    {priceOrig > price && (
                        <p className="text-sm text-muted-foreground line-through">{priceOrig.toLocaleString("vi-VN")}đ</p>
                    )}
                    {price > 0 && (
                        <p className="text-primary">{price.toLocaleString("vi-VN")}đ</p>
                    )}
                </div>

                <p className="text-muted-foreground">
                    {item?.description}
                </p>
                <div className="space-x-1">
                    {
                        item?.volumes.map(vol => (
                            <Button
                                key={vol.sku + "btn"}
                                variant="outline"
                                onClick={() => handleActiveVol(vol.sku)}
                                className={cn("cursor-pointer", size === vol.size && "border border-primary text-primary")}
                            >{vol.size}ml</Button>
                        ))
                    }
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold">Số lượng:</p>
                    <div className="flex gap-4 items-center">
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={handleDecrement}
                            className={cn("cursor-pointer", quantity === 1 && stock === 0 && "pointer-events-none opacity-50")}
                        >
                            <Minus />
                        </Button>
                        <p
                            className={stock === 0 && "opacity-50" || "opacity-100"}
                        >{stock > 0 ? quantity : stock}</p>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={handleIncrement}
                            className={cn("cursor-pointer", item.volumes.map(vol => vol.onStock === quantity || stock === 0 && "pointer-events-none opacity-50"))}
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
                <div className="space-x-1">
                    <Button
                        className={cn("cursor-pointer", stock === 0 && "opacity-50 pointer-events-none")}
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart />
                        <p>Thêm vào giỏ hàng</p>
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="cursor-pointer"
                    >
                        <Heart />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default InfoDetail