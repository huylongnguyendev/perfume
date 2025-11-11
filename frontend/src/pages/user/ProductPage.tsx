import Pagi from '@/components/Pagi'
import { Button } from '@/components/ui/button'
import SideFilter from '@/components/user/filter/SideFilter'
import ProductList from '@/layouts/ProductList'
import { sortList } from '@/lib/data'
import type { SortType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { setSort } from '@/redux/productSort'
import type { AppDispatch, RootState } from '@/redux/store'
import { setIsOpenFilter } from '@/redux/toggleSlice'
import { Filter, SlidersVertical } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProductPage = () => {
  const sortItems: Array<SortType> = (sortList)
  const [toggleSort, setToggleSort] = useState<boolean>(false)
  const [sortSelected, setSortSelected] = useState<string>("")

  const items = useSelector((state: RootState) => state.productList.items)
  const dispatch = useDispatch<AppDispatch>()

  const handleSort = (value: string) => {
    setToggleSort(false)
    setSortSelected(value)
    dispatch(setSort(value))

  }

  return (
    <>
      <div className="mt-28 px-4 md:px-12 lg:px-16 flex gap-5">
        <SideFilter />
        <div className="w-full space-y-5">
          <div className="flex justify-between mb-4">
            <Button
              onClick={() => dispatch(setIsOpenFilter())}
              className="cursor-pointer md:hidden"
            >
              <Filter />
              <span>Bộ lọc</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => setToggleSort(!toggleSort)}
              className="cursor-pointer ms-auto relative group"
            >
              <SlidersVertical />
              <span>
                {
                  sortSelected && sortItems.map(item => item.value === sortSelected && item.label) || "Sắp xếp"
                }
              </span>
              <ul className={cn("absolute top-12 bg-background shadow-md rounded-md p-1 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:visible z-50", toggleSort ? "opacity-100 visible" : "opacity-0 invisible")}>
                {
                  sortItems.map(sortItem =>
                    <li key={sortItem.label}
                      onClick={() => handleSort(sortItem.value)}
                      className="hover:bg-muted px-2 py-1 rounded-sm">{sortItem.label}</li>
                  )
                }
              </ul>
            </Button>
          </div>
          <ProductList />
          {
            items.length > 0 &&
            <Pagi />
          }
        </div>
      </div>
    </>
  )
}

export default ProductPage