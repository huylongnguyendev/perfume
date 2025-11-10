import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetchAllProduct } from '@/redux/productListSlice'
import type { AppDispatch, RootState } from '@/redux/store'
import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  filters: {
    search: string
    gender: string
    minPrice: string
    maxPrice: string
    brand: string
  }
}

const SearchFilter = ({ filters }: Props) => {
  const search = useSelector((state: RootState) => state.productFilter.search)
  const dispacth = useDispatch<AppDispatch>()

  return (
    <>
      <div>
        <div className=" relative">
          <Input
            value={search}
            onChange={(e) => dispacth(fetchAllProduct({ ...filters, search: e.target.value }))}
            placeholder="Tìm kiếm..."
            className="bg-background py-5 pe-10"
          />
          <Button
            variant="outline"
            size="icon-sm"
            className="cursor-pointer absolute right-1 top-1/2 -translate-y-1/2"
          >
            <Search />
          </Button>
        </div>
      </div>
    </>
  )
}

export default SearchFilter