import { Button } from '@/components/ui/button'
import { fetchAllBrands } from '@/redux/brandSlice'
import { setIdToChange } from '@/redux/changeProductSlice'
import { fetchAllProduct } from '@/redux/productListSlice'
import type { AppDispatch } from '@/redux/store'
import { setIsOpenAddProduct } from '@/redux/toggleSlice'
import { Plus, RotateCcw } from 'lucide-react'
import { useDispatch } from 'react-redux'

const ManageHead = () => {
  const dispatch = useDispatch<AppDispatch>()
  const handleReset = () => {
    dispatch(fetchAllProduct({}))
    dispatch(fetchAllBrands())

  }
  return (
    <>
      <div className="flex justify-between items-center w-full ">
        <h2 className="font-semibold">Quản lý sản phẩm</h2>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="cursor-pointer">
            <RotateCcw />
            <span>Tải lại</span>
          </Button>
          <Button
            onClick={() => {
              dispatch(setIdToChange(""))
              dispatch(setIsOpenAddProduct())
            }}
            className="cursor-pointer">
            <Plus />
            <span>Thêm sản phẩm</span>
          </Button>
        </div>
      </div>
    </>
  )
}

export default ManageHead