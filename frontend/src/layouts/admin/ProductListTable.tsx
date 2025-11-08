import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import prd from '@/assets/prd_3.png'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Check, Edit, Trash2, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import { useState } from 'react'
import { cn } from '@/lib/utils'


const ProductListTable = () => {
  const { items } = useSelector((state: RootState) => state.productList)
  const [volSelected, setVolSelected] = useState<Record<string, any>>({})

  if (!items) return

  const selectSize = (productId: string, sku: string) => {
    setVolSelected(prev => ({ ...prev, [productId]: sku }))
  }


  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table >
          <TableHeader className="bg-accent">
            <TableRow>
              <TableHead className="sticky left-0 bg-secondary shadow-md shadow-primary-foreground">Sản phẩm</TableHead>
              <TableHead className="text-center">Số lượng</TableHead>
              <TableHead className="text-center">Giảm giá</TableHead>
              <TableHead className="text-center">Giá gốc</TableHead>
              <TableHead className="text-center">Giá hiện tại</TableHead>
              <TableHead className="text-center">Tổng giá trị</TableHead>
              <TableHead className="w-[100px] text-center">Tùy chọn</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              items && items.length > 0 ? (
                items.map((item) => {
                  const isSelectedSku = volSelected[item._id] || ""
                  const isSelectedVol = item.volumes.find(vol => vol.sku === isSelectedSku)
                  const totalStock = item.volumes.reduce((total, vol) => total + vol.onStock, 0)
                  const totalPrices = item.volumes.reduce((total, vol) => vol.onStock * vol.priceOrig + total, 0)
                  const totalPriceSelected = isSelectedVol ? isSelectedVol?.onStock * isSelectedVol?.priceOrig : 0
                  return (
                    <TableRow key={item._id} >
                      <TableCell className="sticky left-0 flex items-center gap-5 w-xs bg-white shadow-md shadow-primary-foreground">
                        <img src={prd} alt="" width={50} height={50} />
                        <div className="space-y-2">
                          <h3 className="font-semibold capitalize line-clamp-1">{item.name}</h3>
                          <div className="space-y-2">
                            <p className="text-muted-foreground">Dung tích:</p>
                            <div className="flex items-center gap-2">
                              {
                                item.volumes.map((vol) => {
                                  const isSelected = isSelectedSku === vol.sku
                                  return (
                                    <Button key={vol.sku} variant="outline" size="sm" className={cn("cursor-pointer", isSelected && "border-primary text-primary")}
                                      onClick={() => selectSize(item._id, vol.sku)}
                                    >
                                      {vol.size}ml
                                    </Button>
                                  )
                                }
                                )
                              }
                              <Button key={"btn-size-default"}
                                variant="outline" size="sm"
                                className={cn("cursor-pointer", volSelected?.length === 0 || isSelectedSku === "" && "border-primary text-primary")}
                                onClick={() => selectSize(item._id, "")}
                              >
                                Tất cả
                              </Button>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {isSelectedVol ? isSelectedVol.onStock : totalStock}
                      </TableCell>
                      <TableCell className="text-center text-destructive">
                        {
                          isSelectedVol &&
                            (isSelectedVol.discount > 0 && isSelectedVol.discount)
                            || item.volumes.find(vol => vol.discount > 0) ? <Check className="size-4 text-chart-2 mx-auto" /> : <X className="mx-auto size-4" />
                        }
                      </TableCell>
                      <TableCell className="text-center text-chart-5 font-semibold">
                        {isSelectedVol?.priceOrig.toLocaleString("vi-Vn")}
                      </TableCell>
                      <TableCell className="text-center text-chart-2 font-semibold">
                        {isSelectedVol?.price.toLocaleString("vi-Vn")}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {isSelectedVol ? totalPriceSelected.toLocaleString("vi-VN") : totalPrices.toLocaleString("vi-Vn")}
                      </TableCell>
                      <TableCell className="space-x-2 text-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="cursor-pointer">
                              <Edit />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Chỉnh sửa</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="cursor-pointer text-destructive">
                              <Trash2 />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Xóa sản phẩm</TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })
              )

                : <TableRow>
                  <TableCell colSpan={7} className="text-center space-y-2">
                    <p>Không có sản phẩm</p>
                    <Button
                      className="cursor-pointer"
                    >Thêm sản phẩm mới</Button>
                  </TableCell>
                </TableRow>
            }
          </TableBody>
          <TableFooter>
            <TableRow className="font-semibold">
              <TableCell colSpan={5} className="sticky left-0" >Tổng giá trị toàn kho</TableCell>
              <TableCell colSpan={2} className="text-center">
                {
                  items.reduce((total, item) => item.volumes.reduce((total, vol) => vol.onStock * vol.priceOrig + total, 0) + total, 0).toLocaleString("vi-VN")

                }
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  )
}

export default ProductListTable