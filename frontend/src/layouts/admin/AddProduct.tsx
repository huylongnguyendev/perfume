
import AddSizeField from '@/components/admin/AddProduct/AddSizeField'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { genders } from '@/lib/data'
import type { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import z from 'zod'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AddImgField from '@/components/admin/AddProduct/AddImgField'
import AddScentField from '@/components/admin/AddProduct/AddScentField'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { createNewProduct } from '@/redux/productSlice'
import type { ProductAddType } from '@/lib/types'

export const ProductFormSchemaRaw = z.object({
  name: z.string().min(3, "Tên sản phẩm phải có ít nhất 3 ký tự"),
  brand: z.string().min(1, "Thương hiệu là bắt buộc"),
  description: z.string().min(10, "Mô tả sản phẩm phải có ít nhất 10 ký tự"),
  gender: z.enum(["Nam", "Nữ", "Unisex"], { message: "Giới tính là bắt buộc" }),
  category: z.string().min(1, "Danh mục là bắt buộc"),

  scents: z.object({
    top: z.array(z.string().min(1, "Hương đầu không được để trống")).min(1, "Phải có ít nhất một hương đầu"),
    middle: z.array(z.string().min(1, "Hương giữa không được để trống")).min(1, "Phải có ít nhất một hương giữa"),
    base: z.array(z.string().min(1, "Hương cuối không được để trống")).min(1, "Phải có ít nhất một hương cuối"),
  }),

  volumes: z.array(z.object({
    sku: z.string().min(1, "SKU không được để trống"),
    size: z.string().min(1, "Dung tích là bắt buộc"),
    priceOrig: z.string().min(1, "Giá gốc là bắt buộc"),
    discount: z.string().optional(),
    onStock: z.string().optional(),
  })).min(1, "Phải có ít nhất một dung tích"),

  images: z.array(z.string().url("Đường dẫn ảnh không hợp lệ")).optional()
})

type ProductRes = z.infer<typeof ProductFormSchemaRaw>

const AddProduct = () => {
  const brands = useSelector((state: RootState) => state.brands.items)
  const listGender = genders
  const methods = useForm<ProductRes>({
    resolver: zodResolver(ProductFormSchemaRaw),
    defaultValues: {
      name: "",
      brand: "",
      description: "",
      gender: "Unisex",
      category: "",
      scents: {
        top: [""],
        middle: [""],
        base: [""]
      },
      volumes: [{
        sku: "",
        size: "",
        priceOrig: "",
        discount: "",
        onStock: ""
      }],
      images: []
    }
  })

  const onSubmit = async (data: ProductRes) => {
    try {
      const parsed: ProductAddType = {
        ...data,
        name: data.name.trim(),
        brand: data.brand.trim(),
        // category: data.category.trim(),
        description: data.description.trim(),
        images: data.images ?? [],
        scents: {
          top: data.scents.top.map(s => s.trim()).filter(Boolean),
          middle: data.scents.middle.map(s => s.trim()).filter(Boolean),
          base: data.scents.base.map(s => s.trim()).filter(Boolean)
        },
        volumes: data.volumes.map(v => ({
          sku: v.sku.trim(),
          size: Number(v.size),
          priceOrig: Number(v.priceOrig),
          discount: v.discount ? Number(v.discount) : 0,
          onStock: v.onStock ? Number(v.onStock) : 0
        }))
      }

      await createNewProduct(parsed)
    } catch (error) {
      toast.error("Tạo sản phẩm thất bại")
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full bg-card p-4 rounded-md shadow-md space-y-5">
          <h2 className="font-semibold">Thêm sản phẩm mới</h2>
          <div className="space-y-2">
            <Label htmlFor="name">Tên sản phẩm</Label>
            <Input id="name" type="text" {...methods.register("name")} />
            {
              methods.formState.errors.name && (
                <p className="text-sm text-destructive">{methods.formState.errors.name.message}</p>
              )
            }
          </div>
          <div className="space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                {...methods.register("brand")} className="px-2 py-1 rounded-md border font-semibold cursor-pointer">{methods.watch("brand") || "Chọn thương hiệu"}</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                  <Plus className="size-4" />
                  <span>Thêm mới</span>
                </DropdownMenuItem>
                {
                  brands.map(brand => (
                    <DropdownMenuItem
                      key={brand._id}
                      onClick={() => methods.setValue("brand", brand.name)}
                      className="cursor-pointer">
                      {brand.name}
                    </DropdownMenuItem>
                  ))
                }
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                {...methods.register("gender")}
                className="px-2 py-1 rounded-md border font-semibold cursor-pointer">{methods.watch("gender") || "Chọn giới tính"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                  <Plus className="size-4" />
                  <span>Thêm mới</span>
                </DropdownMenuItem>
                {
                  listGender
                    .filter(gender => gender.value !== "All")
                    .map(gender => (
                      <DropdownMenuItem
                        key={gender.value}
                        onClick={() => methods.setValue("gender", gender.value as "Nam" | "Nữ" | "Unisex")}
                        className="cursor-pointer">
                        {gender.label}
                      </DropdownMenuItem>
                    ))
                }
              </DropdownMenuContent>
            </DropdownMenu>
            {methods.formState.errors.brand && methods.formState.errors.gender ? (
              <p className="text-destructive text-sm">{`Vui lòng chọn ${methods.formState.errors.brand?.message} và ${methods.formState.errors.gender?.message}`}</p>
            ) : methods.formState.errors.brand ? <p className="text-destructive text-sm">{`Vui lòng chọn ${methods.formState.errors.brand?.message}`}</p> : methods.formState.errors.gender && <p className="text-destructive text-sm">{`Vui lòng chọn ${methods.formState.errors.gender?.message}`}</p>
            }
          </div>
          <div className="space-x-2">
            <AddSizeField />
          </div>
          <AddImgField />
          <AddScentField />
          <div className="space-y-2">
            <Label htmlFor="desc">Mô tả</Label>
            <Textarea id="desc" {...methods.register("description")} />
            {
              methods.formState.errors.description && (
                <p className="text-sm text-destructive">{methods.formState.errors.description.message}</p>
              )
            }
          </div>
          <div className="flex justify-end items-center gap-2">
            <Button variant="secondary" className="cursor-pointer">Hủy bỏ</Button>
            <Button
              disabled={methods.formState.isSubmitting}
              className="cursor-pointer">Thêm</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddProduct