import FilterProduct from '@/components/admin/manage/FilterProduct'
import ManageHead from '@/components/admin/manage/ManageHead'
import Pagi from '@/components/Pagi'
import AddProduct from '@/layouts/admin/AddProduct'
import ProductListTable from '@/layouts/admin/ProductListTable'
import { cn } from '@/lib/utils'
import type { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const ProductManager = () => {
  const isOpenAddProduct = useSelector((state: RootState) => state.toggle.isOpenAddProduct)
  const id = useSelector((state: RootState) => state.changeProduct.id)

  return (
    <>
      <div className={cn("p-4 space-y-4 relative")}>
        <ManageHead />
        <FilterProduct />
        <div className="space-y-4">
          <ProductListTable />
          <Pagi />
        </div>
        {
          isOpenAddProduct && (
            <AddProduct prodId={id} />
          )
        }
      </div>
    </>
  )
}

export default ProductManager