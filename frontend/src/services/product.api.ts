import axiosProductClient from '@/lib/axiosProductClient'
import { type BrandType, type ProductAddType, type ProductType } from '@/lib/types'

export const productApi = {
  getAllProducts: (params?: Record<string, any>) => axiosProductClient.get<{ products: Array<ProductType>, totalPages: number, totalItems: number }>('/products', { params }),
  getOneProduct: (id: string) => axiosProductClient.get<ProductType>(`/products/${id}`),
  createProduct: (data: ProductAddType) => axiosProductClient.post(`/products`, data)
}
export const brandApi = {
  getAllBrands: () => axiosProductClient.get<Array<BrandType>>('/brands'),
  getOneBrand: (id: string) => axiosProductClient.get<BrandType>(`/brands/${id}`)
}