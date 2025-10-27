import axiosProductClient from '@/lib/axiosClient'
import { type ProductType } from '@/lib/types'

export const productApi = {
    getAllProducts: (params?: Record<string, any>) => axiosProductClient.get<{ products: Array<ProductType>, totalPages: number, totalItems: number }>('/products', { params }),
    getOneProduct: (id: string) => axiosProductClient.get<ProductType>(`/products/${id}`)
}