import { Button } from '@/components/ui/button'
import TitleFilter from './TitleFilter'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/redux/store'
import type { GenderType } from '@/lib/types'
import { genders } from '@/lib/data'
import { resetFilters, setFilters } from '@/redux/productFilterSlice'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const GenderFilter = () => {
    const [genderList, setGenderList] = useState<Array<GenderType>>(genders)
    const dispatch = useDispatch<AppDispatch>()

    const handleActiveGender = (genderValue: "Nam" | "Nữ" | "Unisex" | "All") => {
        const newStateGender = genderList.map(gen => gen.value === genderValue ? { ...gen, isActive: true } : { ...gen, isActive: false })
        setGenderList(newStateGender)
        console.log(genderValue)
        genderValue === "All"
            ? dispatch(resetFilters())
            : dispatch(setFilters({ gender: genderValue }))
    }

    return (
        <>
            <div>
                <TitleFilter title="Giới tính" />
                <div className="space-x-1 space-y-1">
                    {
                        genderList.map(gender => (
                            <Button
                                key={gender.label}
                                variant="outline"
                                onClick={() => handleActiveGender(gender.value)}
                                className={cn("cursor-pointer transition-colors duration-300", gender.isActive && "border border-primary text-primary")}
                            >{gender.label}</Button>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default GenderFilter