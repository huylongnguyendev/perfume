import Pagi from '@/components/Pagi'
import { Button } from '@/components/ui/button'
import SideFilter from '@/components/user/filter/SideFilter'
import ProductList from '@/components/user/product/ProductList'
import type { AppDispatch } from '@/redux/store'
import { setIsOpenFilter } from '@/redux/toggleSlice'
import { Filter, SlidersVertical } from 'lucide-react'
import { useDispatch } from 'react-redux'

const ProductPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <>
            <div className="mt-28 px-4 md:px-12 lg:px-16 flex gap-5">
                <SideFilter />
                <div className="w-full">
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
                    <Pagi />
                </div>
            </div>
        </>
    )
}

export default ProductPage