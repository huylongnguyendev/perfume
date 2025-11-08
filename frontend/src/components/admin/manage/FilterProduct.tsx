import { Button } from '@/components/ui/button'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { fetchAllBrands } from '@/redux/brandSlice'
import { setFilters } from '@/redux/productFilterSlice'
import { fetchAllProduct } from '@/redux/productListSlice'
import type { AppDispatch, RootState } from '@/redux/store'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { genders, sortList } from '../../../lib/data'
import type { GenderType, SortType } from '@/lib/types'
import { setSort } from '@/redux/productSort'

const FilterProduct = () => {
  const { search, maxPrice } = useSelector((state: RootState) => state.productFilter)
  const filters = useSelector((state: RootState) => state.productFilter)
  const sort = useSelector((state: RootState) => state.productSort.sort)
  const brands = useSelector((state: RootState) => state.brands.items)
  const [listGender] = useState<Array<GenderType>>(genders)
  const [listSort] = useState<Array<SortType>>(sortList)
  const dispatch = useDispatch<AppDispatch>()

  const handleSelectGender = (value: string) => {
    const gender = value !== "All" ? value : ""
    dispatch(setFilters({ gender, search: "" }))
  }

  useEffect(() => {
    dispatch(fetchAllProduct({ ...filters, sort }))
  }, [maxPrice, sort])


  useEffect(() => {
    dispatch(fetchAllBrands())
  }, [dispatch])

  return (
    <>
      <div className="md:flex justify-between items-center max-md:space-y-2">
        {/* search */}
        <div className="relative max-md:w-full">
          <Input value={search} onChange={(e) => dispatch(setFilters({ search: e.target.value, brand: "" }))} className="pe-10" placeholder="Tìm kiếm sản phẩm..." />
          <Button variant="outline"
            size="icon"
            className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-0"
          ><Search /></Button>
        </div>
        <div className="flex gap-2 items-center justify-center max-md:w-full ">
          {/* brand */}
          <DropdownMenu>
            <DropdownMenuTrigger className="border rounded-md px-2 py-1 cursor-pointer font-semibold">{filters.brand !== "" && filters.brand || "Thương hiệu"}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => dispatch(setFilters({ brand: "", search: "" }))}>
                Tất cả
              </DropdownMenuItem>
              {
                brands.map(brand => (
                  <DropdownMenuItem key={brand._id}
                    onClick={() => dispatch(setFilters({ brand: brand.name, search: "" }))}
                    className="cursor-pointer">
                    {brand.name}
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
          {/* genders */}
          <DropdownMenu>
            <DropdownMenuTrigger className="border rounded-md px-2 py-1 cursor-pointer font-semibold">{filters.gender !== "All" && filters.gender || "Giới tính"}</DropdownMenuTrigger>
            <DropdownMenuContent>
              {
                listGender.map(gender => (
                  <DropdownMenuItem key={gender.value}
                    onClick={() => handleSelectGender(gender.value)}
                    className="cursor-pointer">
                    {gender.label}
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* sort */}
        <DropdownMenu>
          <DropdownMenuTrigger className="border rounded-md px-2 py-1 cursor-pointer font-semibold max-md:block max-md:ms-auto">{
            listSort.find(item => item.value === sort)?.label ?? "Sắp xếp"
          }</DropdownMenuTrigger>
          <DropdownMenuContent>
            {
              listSort.map(item => (
                <DropdownMenuItem key={item.value}
                  onClick={() => dispatch(setSort(item.value))}
                  className="cursor-pointer">
                  {item.label}
                </DropdownMenuItem>
              ))
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

export default FilterProduct