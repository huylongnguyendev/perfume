import FilterProduct from '@/components/admin/manage/FilterProduct'
import ManageHead from '@/components/admin/manage/ManageHead'
import Pagi from '@/components/Pagi'
import AddProduct from '@/layouts/admin/AddProduct'
import ProductListTable from '@/layouts/admin/ProductListTable'

const ProductManager = () => {
  return (
    <>
      <div className="p-4 space-y-4">
        <ManageHead />
        <FilterProduct />
        <div className="space-y-4">
          <ProductListTable />
          <Pagi />
        </div>
        <AddProduct />

      </div>
    </>
  )
}

export default ProductManager