import { Button } from '@/components/ui/button'
import TitleFilter from './TitleFilter'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/redux/store'
import type { GenderType } from '@/lib/types'
import { genders } from '@/lib/data'
import { resetFilters } from '@/redux/productFilterSlice'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { fetchAllProduct } from '@/redux/productListSlice'

interface Props {
  filters: {
    search: string
    gender: string
    minPrice: string
    maxPrice: string
    brand: string
  }
}

const GenderFilter = ({ filters }: Props) => {
  const [genderList, setGenderList] = useState<Array<GenderType>>(genders)
  const dispatch = useDispatch<AppDispatch>()

  const handleActiveGender = (genderValue: "Nam" | "Nữ" | "Unisex" | "All") => {
    const newStateGender = genderList.map(gen => gen.value === genderValue ? { ...gen, isActive: true } : { ...gen, isActive: false })
    setGenderList(newStateGender)
    genderValue === "All"
      ? dispatch(resetFilters())
      : dispatch(fetchAllProduct({ ...filters, gender: genderValue }))
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