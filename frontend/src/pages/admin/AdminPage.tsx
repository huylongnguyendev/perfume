import { ChartBarMultiple } from '@/components/admin/charts/ChartBarMultiple'
import { ChartLineDots } from '@/components/admin/charts/ChartLineDots'
import type { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const AdminPage = () => {
  const items = useSelector((state: RootState) => state.productList.items)
  const brands = useSelector((state: RootState) => state.brands.items)
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-4">
        <ChartLineDots />
        <div className="space-y-2 shadow-md h-fit rounded-md">
          <p className="p-4 shadow-md rounded-md">Tổng sản phẩm: <span className="font-semibold">{items.length}</span></p>
          <div className="rounded-b-md overflow-hidden">
            <p className="ps-4 py-2 border-r-4 border-r-chart-1">Nam: <span className="font-semibold">{items.filter(item => item.gender === "Nam").length}</span></p>
            <p className="ps-4 py-2 border-r-4 border-r-chart-2" >Nữ: <span className="font-semibold">{items.filter(item => item.gender === "Nữ").length}</span></p>
            <p className="ps-4 py-2 border-r-4 border-r-chart-5" >Unisex: <span className="font-semibold">{items.filter(item => item.gender === "Unisex").length}</span></p>
          </div>
          <div className="space-y-2 shadow-md h-fit rounded-md">
            <p className="p-4 shadow-md rounded-md">Thương hiệu: <span className="font-semibold">{brands.length}</span></p>
            <ul className="ps-4 h-60 overflow-y-scroll">
              {
                brands.map(brand => (
                  <li key={brand._id} className="">
                    {brand.name}
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
      <ChartBarMultiple />
    </>
  )
}

export default AdminPage