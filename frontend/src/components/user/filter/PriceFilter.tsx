import { Slider } from '@/components/ui/slider'
import TitleFilter from './TitleFilter'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/redux/store'
import { setFilters } from '@/redux/productFilterSlice'

const PriceFilter = () => {
    const [value, setValue] = useState<Array<number>>([500000, 50000000])
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(setFilters({ minPrice: value[0].toString(), maxPrice: value[1].toString() }))
    }, [value])

    return (
        <>
            <div>
                <TitleFilter title="Giá" />
                <div>
                    <Slider
                        min={500000}
                        max={50000000}
                        step={100000}
                        value={value}
                        onValueChange={setValue}
                    />
                    <div className="text-primary flex justify-between items-center mt-2">
                        <span>{value[0].toLocaleString()}đ</span>
                        <span>{value[1].toLocaleString()}đ</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PriceFilter