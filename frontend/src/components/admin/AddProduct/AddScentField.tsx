import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { X } from 'lucide-react'

const AddScentField = () => {
  const { control, register } = useFormContext()

  const { fields: topScents, append: addTop, remove: removeTop } = useFieldArray({
    control,
    name: "scents.top"
  })
  const { fields: middleScents, append: addMiddle, remove: removeMiddle } = useFieldArray({
    control,
    name: "scents.middle"
  })
  const { fields: baseScents, append: addBase, remove: removeBase } = useFieldArray({
    control,
    name: "scents.base"
  })

  const renderGroup = (
    label: string,
    fields: typeof topScents,
    registerName: string,
    onAdd: () => void,
    onRemove: (index: number) => void
  ) => (
    <div className="space-y-2 flex items-baseline-last gap-2">
      <Label>{label}</Label>
      <Button type="button" onClick={onAdd} variant="outline" size="sm">
        Thêm {label.toLowerCase()}
      </Button>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-center">
          <Input {...register(`${registerName}.${index}`)} />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => onRemove(index)}
            className="text-destructive"
          >
            <X className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {renderGroup("Hương đầu", topScents, "scents.top", () => addTop(""), removeTop)}
      {renderGroup("Hương giữa", middleScents, "scents.middle", () => addMiddle(""), removeMiddle)}
      {renderGroup("Hương cuối", baseScents, "scents.base", () => addBase(""), removeBase)}
    </div>
  )
}

export default AddScentField