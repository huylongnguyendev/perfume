import { cn } from '@/lib/utils'
import type { ProductType } from '@/lib/types'
import { useState } from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import prd from '@/assets/prd_3.png'
import { Badge } from '../ui/badge'
import ProductImgActions from './ProductImgActions'

interface Props {
    product: ProductType
}

const ProductItem = ({ product }: Props) => {
    const [volSelected, setVolSelected] = useState<string>(product.volumes[0].sku)
    const handleActiveVol = (sku: string) => {
        setVolSelected(sku)
    }
    return (
        <>
            <div className={cn("shadow-md rounded-md p-4")}>
                <div className="relative group overflow-hidden">
                    <img src={prd} alt="" className="size-full object-cover transition-all duration-300 group-hover:scale-110" />
                    {
                        product.volumes.map(vol => vol.sku === volSelected && (
                            vol.discount > 0 && <Badge
                                key={vol.sku + "discount"}
                                variant="destructive"
                                className="absolute top-1 left-1"
                            >-{vol.discount}%</Badge>
                        ))
                    }
                    <ProductImgActions id={product._id} />
                </div>
                <div className="space-y-4">
                    <div className="text-center font-semibold -space-y-1">
                        <p className="text-sm text-muted-foreground uppercase">{product.brand}</p>
                        <h3 className="capitalize line-clamp-1 text-balance">{product.name}</h3>
                    </div>
                    <div className="space-x-1 text-center">
                        {
                            product.volumes.map(vol => (
                                <Button
                                    key={vol.sku + "btn"}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleActiveVol(vol.sku)}
                                    className={cn("cursor-pointer rounded-full border border-transparent transition-colors duration-300", vol.sku === volSelected && "border-primary")}
                                >
                                    {vol.size}ml
                                </Button>
                            ))
                        }
                    </div>
                    {
                        product.volumes.map(vol => vol.sku === volSelected && (
                            <div
                                key={vol.sku + "price"}
                                className="flex justify-end gap-1 items-baseline-last font-semibold">
                                {
                                    vol.price < vol.priceOrig && <p
                                        key={vol.price}
                                        className="text-sm text-muted-foreground line-through">
                                        {vol.priceOrig.toLocaleString("vi-VN")}
                                    </p>
                                }

                                <p className="text-lg text-primary">{vol.price.toLocaleString("vi-VN")}</p>
                            </div>
                        ))

                    }
                    <Button
                        className="cursor-pointer w-full"
                    >
                        <ShoppingCart />
                        <p>Thêm vào giỏ hàng</p>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ProductItem