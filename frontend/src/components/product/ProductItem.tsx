import { cn } from '@/lib/utils'
import type { ProductType } from '@/lib/types'
import { useState } from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { Badge } from '../ui/badge'
import ProductImgActions from './ProductImgActions'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { addToCart, fetchCart } from '@/redux/cartSlice'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

interface Props {
    product: ProductType
}

const ProductItem = ({ product }: Props) => {
    const message = useSelector((state: RootState) => state.cart.message)
    const defaultVol = product.volumes?.[0]
    const [size, setSize] = useState<number>(defaultVol?.size ?? 0)
    const [priceOrig, setPriceOrig] = useState<number>(defaultVol?.priceOrig ?? 0)
    const [price, setPrice] = useState<number>(defaultVol?.price ?? 0)
    const [discount, setDiscount] = useState<number>(defaultVol?.discount ?? 0)


    const handleActiveVol = (sku: string) => {
        const selectVol = product.volumes.filter(vol => vol.sku === sku)[0]
        setSize(selectVol.size)
        setPriceOrig(selectVol.priceOrig)
        setPrice(selectVol.price)
        setDiscount(selectVol.discount)
    }

    const dispatch = useDispatch<AppDispatch>()

    const handleAddToCart = async () => {
        try {
            await dispatch(addToCart({
                productId: product._id,
                quantity: 1,
                selectedVolume: {
                    volume: size,
                    discount,
                    priceOrig,
                    price
                }
            })).unwrap()
            await dispatch(fetchCart())
            toast.success(message)
        } catch (error: any) {
            toast.error(error)
        }
    }

    return (
        <>
            <div className="shadow-md rounded-md p-2 bg-card transition-all duration-300 hover:shadow-xl">
                <div className="relative group overflow-hidden flex-1 h-60">
                    <img src={product.images.find(img => img !== "")} alt={product._id} className="size-full object-cover transition-all duration-300 group-hover:scale-110" />
                    {
                        discount > 0 && (
                            <Badge
                                className="absolute top-1 left-1 bg-gradient-to-r from-primary via-purple-50-500 to-pink-500 border-pink-500"
                            >-{discount}%</Badge>
                        )

                    }
                    <ProductImgActions id={product._id} />
                </div>
                <div className="space-y-4 flex-1">
                    <div className="text-center font-semibold -space-y-1">
                        <p className="text-sm text-muted-foreground uppercase">{product.brand}</p>
                        <h3 className="capitalize text-card-foreground line-clamp-1 text-balance">
                            <Link
                                className="hover:text-primary transition-colors duration-300"
                                to={`/shop/products/${product._id}`}>{product.name}</Link>
                        </h3>
                    </div>
                    <div className="space-x-1 text-center">
                        {
                            product.volumes?.map(vol => vol.onStock > 0 && (
                                <Button
                                    key={vol.sku + "btn"}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleActiveVol(vol.sku)}
                                    className={cn("cursor-pointer rounded-full border border-transparent transition-colors duration-300", size === vol.size && "border-primary")}
                                >
                                    {vol.size}ml
                                </Button>
                            ))
                        }
                    </div>

                    <div
                        className="text-right font-semibold h-11">

                        <p className={cn("text-sm text-muted-foreground line-through opacity-0 invisible", priceOrig > price && "opacity-100 visible")}>{priceOrig.toLocaleString("vi-VN")}đ</p>

                        {price > 0 && (
                            <p className="text-primary">{price.toLocaleString("vi-VN")}đ</p>
                        )}
                    </div>

                    <Button
                        onClick={handleAddToCart}
                        className="cursor-pointer w-full mt-auto max-xl:gap-1 max-xl:text-sm"
                    >
                        <ShoppingCart />
                        <p>Thêm giỏ hàng</p>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ProductItem