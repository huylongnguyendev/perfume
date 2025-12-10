import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import prd from '@/assets/prd_3.png'
import { Button } from '@/components/ui/button'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { addToCart, fetchCart, removeCartItem } from '@/redux/cartSlice';
import type { CartItemType, ProductType } from '@/lib/types'
import { useEffect } from 'react'
import { fetchAllProduct } from '@/redux/productListSlice'
import { Link } from 'react-router-dom'

const CartTable = () => {
  const { items } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.productList.items)
  const filters = useSelector((state: RootState) => state.productFilter)
  useEffect(() => {
    dispatch(fetchAllProduct({ filters }))
    dispatch(fetchCart())
  }, [dispatch])

  const quantityToAdd = async (item: CartItemType) => {
    const product = products.find(prd => prd._id === item.productId._id)
    const stock = product?.volumes.find(vol => vol.size === item.selectedVolume.volume)?.onStock || 0
    const currentQuantity = item.quantity
    return { product, currentQuantity, stock }
  }

  const addNewQuantityToCart = async (product: ProductType | undefined, item: CartItemType, addQuantity: number) => {
    await dispatch(addToCart({
      productId: product?._id ?? item.productId._id,
      quantity: addQuantity,
      selectedVolume: item.selectedVolume
    })).unwrap()
    await dispatch(fetchCart())
  }

  const handleRemoveItem = async (id: string, volume: number) => {
    try {
      await dispatch(removeCartItem({ id, volume })).unwrap()
      await dispatch(fetchCart())
      toast.success("Cập nhật giỏ hàng thành công")
    } catch (error: any) {
      toast.error(error?.message || "Xóa sản phẩm thất bại")
    }
  }

  const handleIncreasement = async (item: CartItemType) => {
    const { product, currentQuantity, stock } = await quantityToAdd(item)
    if (currentQuantity < stock) {
      try {
        await addNewQuantityToCart(product, item, 1)
        toast.success("Cập nhật giỏ hàng thành công")
      } catch (error: any) {
        toast.error(error?.message || "Cập nhật giỏ hàng thất bại")
      }
    }
  }
  const handleDecreasement = async (item: CartItemType) => {
    const { product, currentQuantity } = await quantityToAdd(item)
    if (currentQuantity > 1) {
      try {
        await addNewQuantityToCart(product, item, -1)
        toast.success("Cập nhật giỏ hàng thành công")
      } catch (error: any) {
        toast.error(error?.message || "Cập nhật giỏ hàng thất bại")
      }
    }
  }


  return (
    <>
      <div className="w-full">
        <div className="[&>div]:max-h-[500px] [&>div]:rounded-sm [&>div]:border">
          <Table>
            <TableHeader>
              <TableRow className='bg-muted/50 border-none'>
                <TableHead className=''>Sản phẩm</TableHead>
                <TableHead className='text-right'>Tạm tính</TableHead>
                <TableHead className='text-right'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                items && items.length > 0 ? (
                  items.map((item, index) => (
                    <TableRow key={item.productId._id + index.toString()}>
                      <TableCell>
                        <div className="flex gap-3 items-center">
                          <Avatar className='rounded-sm size-12'>
                            <AvatarImage src={item.productId.images[0] } alt={item.productId.name} />
                          </Avatar>
                          <div className="font-semibold flex flex-col gap-3">
                            <div>
                              <h3 className="text-sm">{item?.productId?.name || ""}</h3>
                              <p className="text-xs text-muted-foreground"><span>Dung tích:</span> <span>{item.selectedVolume.volume}ml</span></p>
                            </div>
                            <div className="flex items-center gap-2 mt-auto">
                              <Button variant="outline" size="icon-sm" onClick={() => handleDecreasement(item)}
                                className="cursor-pointer"><Minus className="size-3" /></Button>
                              <span>{item.quantity}</span>
                              <Button variant="outline" size="icon-sm"
                                onClick={() => handleIncreasement(item)}
                                className="cursor-pointer"><Plus className="size-3" /></Button>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {(item?.selectedVolume.price * item.quantity).toLocaleString("vi-VN")}đ
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleRemoveItem(item?.productId._id, item.selectedVolume.volume)}
                          className="cursor-pointer group"
                        >
                          <Trash2 className="group-hover:text-destructive transition-colors duration-300" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )
                : (<TableRow>
                  <TableCell className="w-full">
                    <div className="text-center p-4 space-y-5">
                      <p className="font-semibold">Giỏ hàng trống</p>
                      <Button>
                        <Link to="/shop/products" className="inline-flex justify-center items-center gap-2 size-full">
                          <ShoppingCart />
                          <span>Tiếp tục mua hàng</span>
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>)
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default CartTable