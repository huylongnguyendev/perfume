import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Item, ItemContent, ItemGroup, ItemHeader, ItemTitle } from '@/components/ui/item'
import { Label } from '@/components/ui/label'
import { imageApi } from '@/services/image.api'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

const AddImgField = () => {
  const [images, setImages] = useState<Array<File>>([])
  const { setValue, getValues } = useFormContext()

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const fileArray = Array.from(files)
    setImages(prev => [...prev, ...fileArray])
    const uploadedUrls = await imageApi.uploadImage(fileArray)
    const current = getValues("images") || []
    setValue("images", [...current, ...uploadedUrls])
  }

  const handleRemoveImage = (index: number) => {
    const newListImage = images.filter((_, i) => i !== index)
    setImages(newListImage)
    const current = getValues("images") || []
    setValue("images", current.filter((_: string, i: number) => i !== index))
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Label>Thêm hình ảnh</Label>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleAddImage}
            className="cursor-pointer max-w-xs" />
        </div>
        <ItemGroup className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {
            images.map((file, index) => {
              const imgUrl = URL.createObjectURL(file)
              return (
                <Item key={index} className="shadow-md inline-flex justify-center items-center relative">
                  <ItemHeader>
                    <img src={imgUrl} alt={`preview-${index}`} className="size-full object-cover" />
                    <Button
                      variant="secondary"
                      size="icon-sm"
                      onClick={() => handleRemoveImage(index)}
                      className="cursor-pointer rounded-full absolute top-2 right-2 hover:text-destructive">
                      <X className="size-4" />
                    </Button>
                  </ItemHeader>
                  <ItemContent>
                    <ItemTitle>{file.name}</ItemTitle>
                  </ItemContent>
                </Item>
              )
            })
          }
        </ItemGroup>
      </div>
    </>
  )
}

export default AddImgField