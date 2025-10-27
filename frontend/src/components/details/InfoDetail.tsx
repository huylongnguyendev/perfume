import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProductType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

interface Props {
    item: ProductType
}

const InfoDetail = ({ item }: Props) => {
    const [volSelected, setVolSelected] = useState<string>(item.volumes[0].sku)
    const [quanity, setQuantity] = useState<number>(1)

    const handleDecrement = () => {
        if (quanity > 1)
            setQuantity(prev => prev - 1)
    }

    const handleIncrement = () => {
        const isOutStock = item.volumes.map(vol => vol.sku === volSelected && vol.onStock === quanity)
        isOutStock && setQuantity(prev => prev + 1)
    }

    return (
        <>
            <div className="shadow-md p-4 md:w-1/2 rounded-lg space-y-5">
                <div className="flex gap-2">
                    <h2 className="text-xl font-semibold">{item?.name}</h2>
                    {
                        item.volumes.map(vol => vol.sku === volSelected && vol.discount && (
                            <Badge
                                key={vol.sku + "discount"}
                                variant="destructive" className="text-base">
                                -{vol.discount}%
                            </Badge>
                        ) || "")
                    }
                </div>
                <div className="leading-5 text-muted-foreground">
                    <p>{item?.category}</p>
                    <p>Giới tính: {item?.gender}</p>
                    {
                        item.volumes.map(vol => vol.sku === volSelected && (
                            vol.onStock && (
                                <p key={vol.sku + "stock"}>Kho hàng: {vol.onStock}</p>
                            ) || (<p key={vol.sku + "stock"}>Kho hàng: Hết hàng</p>)
                        ))
                    }
                </div>
                {
                    item.volumes.map(vol => vol.sku === volSelected && (
                        <div
                            key={vol.sku + "prices"}
                            className="text-muted-foreground font-semibold">
                            {
                                vol.discount && (
                                    <p
                                        key={vol.sku + "orginalPrice"}
                                        className="line-through">{vol.priceOrig.toLocaleString("vi-VN")}đ</p>
                                ) || ""
                            }
                            <p className="text-lg text-primary">{vol.price.toLocaleString("vi-VN")}đ</p>
                        </div>
                    ))
                }
                <p className="text-muted-foreground">
                    {item?.description}
                </p>
                <div className="space-x-1">
                    {
                        item?.volumes.map(vol => (
                            <Button
                                key={vol.sku + "btn"}
                                variant="outline"
                                onClick={() => setVolSelected(vol.sku)}
                                className={cn("cursor-pointer", vol.sku === volSelected && "border border-primary text-primary")}
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
                            className={cn("cursor-pointer", quanity === 1 && "pointer-events-none opacity-50")}
                        >
                            <Minus />
                        </Button>
                        <p>{quanity}</p>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={handleIncrement}
                            className={cn("cursor-pointer", item.volumes.map(vol => vol.sku === volSelected && vol.onStock === quanity && "pointer-events-none opacity-50"))}
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
                <div className="space-x-1">
                    <Button
                        className="cursor-pointer"
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