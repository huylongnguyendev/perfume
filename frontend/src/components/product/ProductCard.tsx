import type { ProductType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'
import ProductImgActions from './ProductImgActions'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { ShoppingCart, Trash } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { toast } from 'sonner'
import { addToCart } from '@/redux/cartSlice'

interface Props {
  product: ProductType
}
const ProductCard = ({ product }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [volSelect, setVolSelect] = useState<string>(product.volumes[0].sku)
  const message = useSelector((state: RootState) => state.cart.message)
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()
  const navigate = useNavigate()

  const handleActiveVol = (vol: string) => {
    setVolSelect(vol)
  }

  const handleAddToCart = async (volSelected: string) => {
    const addData = product.volumes.find(vol => vol.sku === volSelected)
    if (addData) {
      try {
        await dispatch(addToCart({
          productId: product._id,
          quantity: 1,
          selectedVolume: {
            discount: addData?.discount,
            price: addData?.price,
            volume: addData?.size,
            priceOrig: addData?.priceOrig
          }
        }))
        toast.success("Đã thêm sản phẩm vào giỏ hàng")
      } catch (error: any) {
        toast.error(error?.message || "Thêm vào giỏ hàng thất bại")
      }
    }
  }

  const handleToProductDetail = (productId: string) => {
    if (!id || id !== productId) navigate(`products/${productId}`)
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <div className={cn("shadow-md rounded-md p-2")}>
        <div className="relative group overflow-hidden flex justify-center items-center h-[168px]">
          <img src={product.images.find(img => img !== "")} alt={product._id} width={144} height={144} className="object-cover transition-all duration-300 group-hover:scale-110" />
          {
            product.volumes.map(vol => vol.sku === volSelect && vol.discount > 0 && (
              <Badge key={vol.sku} className="absolute top-4 left-4 bg-gradient-to-r from-primary via-purple-50-500 to-pink-500 border-pink-500">-{vol.discount}%</Badge>
            ))
          }
          <ProductImgActions id={product._id} />
        </div>
        <div className="space-y-4 flex-1">
          <div className="text-center font-semibold -space-y-1">
            <p className="text-sm text-muted-foreground uppercase">{product.brand}</p>
            <h3 className="capitalize line-clamp-1 text-balance transition-colors duration-300 hover:text-primary cursor-pointer"
              onClick={() => handleToProductDetail(product._id)}
            >
              {product.name}
            </h3>
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-4 line-clamp-2 mt-1">
          {product.description}
        </p>
        {
          product.volumes.map(vol => vol.sku === volSelect && (
            <div key={vol.sku + "prices"} className="flex items-baseline-last gap-2 justify-end font-semibold mt-2">
              {
                vol.priceOrig > 0 && (
                  <p className="text-xs line-through text-muted-foreground">{vol.priceOrig.toLocaleString("vi-VN")}đ</p>
                )
              }
              <p className="text-primary">{vol.price.toLocaleString("vi-VN")}đ</p>
            </div>
          ))
        }
        <div className="mt-2 flex justify-between items-center">
          <div className="space-x-1">
            {product.volumes.map(vol => vol.onStock > 0 && (
              <Button
                key={vol.sku}
                variant="outline"
                size="sm"
                onClick={() => handleActiveVol(vol.sku)}
                className={cn("cursor-pointer", vol.sku === volSelect && "border-primary text-primary")}
              >
                {vol.size}ml
              </Button>
            ))}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              {
                user?.admin && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="cursor-pointer rounded-full"
                    onClick={() => handleAddToCart(volSelect)}
                  >
                    <Trash />
                  </Button>
                ) || (
                  <Button
                    size="icon"
                    className="cursor-pointer rounded-full"
                    onClick={() => handleAddToCart(volSelect)}
                  >
                    <ShoppingCart />
                  </Button>
                )
              }
            </TooltipTrigger>
            <TooltipContent>{user?.admin && "Xóa sản phẩm" || "Thêm vào giỏ hàng"}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  )
}

export default ProductCard