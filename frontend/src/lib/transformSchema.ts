import { ProductFormSchemaRaw } from '@/layouts/admin/AddProduct'

export const ProductFormSchema = ProductFormSchemaRaw.transform(data => ({
  ...data,
  volumes: data.volumes.map(v => ({
    sku: v.sku,
    size: Number(v.size),
    priceOrig: Number(v.priceOrig),
    discount: v.discount ? Number(v.discount) : 0,
    onStock: v.onStock ? Number(v.onStock) : 0,
  }))
}))