import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createBrand, fetchAllBrands } from '@/redux/brandSlice'
import type { AppDispatch } from '@/redux/store'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

interface Props {
  isCreate: boolean
  setIsCreate: (set: boolean) => void
}

const AddBrand = ({ isCreate, setIsCreate }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState<string>("")
  const dispatch = useDispatch<AppDispatch>()

  const handleClickOutSide = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node))
      setIsCreate(!isCreate)
  }

  const handleAddBrand = async () => {
    try {
      console.log(input)
      await dispatch(createBrand({ name: input }))
      await dispatch(fetchAllBrands())
      toast.success("Thêm thương hiệu thành công")
    } catch (error: any) {
      toast.error(error)
    }
  }

  const handleInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await handleAddBrand()
      setIsCreate(!isCreate)
    }
    else if (e.key === "Escape") {
      setInput("")
      setIsCreate(!isCreate)
    }
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutSide)
    return () => window.removeEventListener("mousedown", handleClickOutSide)
  }, [isCreate])

  return (
    <>
      <div
        ref={ref}
        className="absolute z-50 top-1/2 left-1/2 -translate-1/2 bg-background p-4 rounded-md shadow-lg space-y-3 border">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold" >Thêm thương hiệu</h3>
          <Button variant="outline" size="icon-sm"
            onClick={() => setIsCreate(!isCreate)}
            className="cursor-pointer hover:text-destructive rounded-full"><X className="size-3" /></Button>
        </div>
        <div className="flex justify-center items-center gap-2 ">
          <Input value={input} onKeyDown={(e) => handleInput(e)} onChange={(e) => setInput(e.target.value)} />
          <Button
            onClick={handleAddBrand}
            className="cursor-pointer">Thêm</Button>
        </div>
      </div>
    </>
  )
}

export default AddBrand