import { useDispatch, useSelector } from 'react-redux'
import BrandFilter from './BrandFilter'
import GenderFilter from './GenderFilter'
import PriceFilter from './PriceFilter'
import SearchFilter from './SearchFilter'
import type { AppDispatch, RootState } from '@/redux/store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { setIsOpenFilter } from '@/redux/toggleSlice'

const SideFilter = () => {
  const isOpenFilter = useSelector((state: RootState) => state.toggle.isOpenFilter)
  const filters = useSelector((state: RootState) => state.productFilter)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <>
      <aside className={cn("w-1/3 bg-secondary/40 rounded-lg p-4 space-y-5 h-fit absolute max-md:-left-96 transition-all duration-300 z-50 max-md:h-dvh top-0 max-md:flex max-md:flex-col justify-between md:sticky md:top-24 md:z-10 max-md:shadow-md", isOpenFilter && "max-md:left-0")}>
        <SearchFilter filters={filters} />
        <BrandFilter filters={filters} />
        <GenderFilter filters={filters} />
        <PriceFilter filters={filters} />
        <div className="flex justify-between items-center mt-auto md:hidden">
          <Button
            variant="secondary"
            onClick={() => dispatch(setIsOpenFilter())}
            className="cursor-pointer w-1/2"
          >
            Hủy bỏ
          </Button>
          <Button
            className="cursor-pointer w-1/2"
          >
            Xác nhận
          </Button>
        </div>
      </aside>
    </>
  )
}

export default SideFilter