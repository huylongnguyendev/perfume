import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Minus, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'

const AddSizeField = () => {
  const { register, control, formState: { errors } } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: "volumes" })
  return (
    <>
      <div className="space-y-4 p-4 rounded-md bg-accent/50">
        <div className="flex items-center justify-end">
          <Button
            onClick={() => {
              append({
                sku: "",
                size: "",
                priceOrig: "",
                discount: "",
                onStock: ""
              })
            }}
            className="cursor-pointer">
            <p className="inline-flex size-full gap-1 justify-center items-center">
              <Plus className="size-4" />
              <span>Thêm dung tích</span>
            </p>
          </Button>
        </div>
        {
          fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 ">
              <div className="space-y-2">
                <Label htmlFor="sku" className="text-sm font-semibold">SKU</Label>
                <Input type="text" className="bg-card" id="sku" {...register(`volumes.${index}.sku`)} />
                <p className="text-xs text-destructive">
                  {Array.isArray(errors.volumes) && errors.volumes[index]?.sku?.message}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="size" className="text-sm font-semibold">Dung tích</Label>
                <Input type="number" className="bg-card" id="size" {...register(`volumes.${index}.size`)} />
                <p className="text-xs text-destructive">
                  {Array.isArray(errors.volumes) && errors.volumes[index]?.size?.message}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="onStock" className="text-sm font-semibold">Số lượng</Label>
                <Input type="number" className="bg-card" id="onStock" placeholder="0" {...register(`volumes.${index}.onStock`)} />
                <p className="text-xs text-destructive">
                  {Array.isArray(errors.volumes) && errors.volumes[index]?.onStock?.message}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-semibold">Giá</Label>
                <Input type="number" className="bg-card" id="price" {...register(`volumes.${index}.priceOrig`)} />
                <p className="text-xs text-destructive">
                  {Array.isArray(errors.volumes) && errors.volumes[index]?.priceOrig?.message}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-semibold">Giảm giá</Label>
                <Input type="number" className="bg-card" id="price" placeholder="0" {...register(`volumes.${index}.discount`)} />
                <p className="text-xs text-destructive">
                  {Array.isArray(errors.volumes) && errors.volumes[index]?.discount?.message}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => remove(index)}
                className={cn("cursor-pointer mt-auto mb-2", fields.length < 2 && "opacity-50 pointer-events-none")}>
                <Minus className="size-4" />
              </Button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default AddSizeField