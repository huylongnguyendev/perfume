import Pagi from '@/components/Pagi'
import { Button } from '@/components/ui/button'
import SideFilter from '@/components/user/filter/SideFilter'
import ProductList from '@/layouts/ProductList'
import type { AppDispatch, RootState } from '@/redux/store'
import { setIsOpenFilter } from '@/redux/toggleSlice'
import { Filter, SlidersVertical } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

const ProductPage = () => {
    const items = useSelector((state: RootState) => state.productList.items)
    const dispatch = useDispatch<AppDispatch>()
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
                            className="cursor-pointer ms-auto"
                        >
                            <SlidersVertical />
                            <span>Sắp xếp</span>
                        </Button>
                    </div>
                    <ProductList />
                    {
                        items.length &&
                        <Pagi /> || ""

                    }
                </div>
            </div>
        </>
    )
}

export default ProductPage