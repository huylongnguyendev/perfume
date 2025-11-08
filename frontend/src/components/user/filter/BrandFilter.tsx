import { useDispatch, useSelector } from 'react-redux'
import TitleFilter from './TitleFilter'
import type { AppDispatch, RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { fetchAllBrands } from '@/redux/brandSlice'
import { setFilters } from '@/redux/productFilterSlice'
import { cn } from '@/lib/utils'

const BrandFilter = () => {
    const { items, loading } = useSelector((state: RootState) => state.brands)

    const [brandSelected, setBrandSelected] = useState<string>("")

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchAllBrands())
    }, [])
    
    const handleSelectBrand = (brandName: string) => {
        dispatch(setFilters({ brand: brandName }))
        setBrandSelected(brandName)
    }

    return (

        <>
            <div>
                <TitleFilter title="Thương hiệu" />
                <ul className="w-full rounded-lg overflow-y-scroll h-40 border bg-background font-semibold p-1">
                    {
                        items.length > 0 && Array.isArray(items) && loading === "success" ? (
                            items.map(brand => (

                                <li
                                    key={brand._id}
                                    onClick={()=>handleSelectBrand(brand.name)}
                                    className={cn("px-4 py-1 rounded-md transition-colors hover:text-primary hover:bg-muted cursor-pointer", brandSelected === brand.name && "bg-primary/10 text-primary")}>
                                    {brand.name}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-1 bg-muted rounded-md pointer-events-none">Không có thương hiệu</li>
                        )
                    }
                </ul>
            </div>
        </>
    )
}

export default BrandFilter