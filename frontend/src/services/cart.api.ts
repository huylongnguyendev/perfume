import axiosCartClient from '@/lib/axiosCartClient'
import type { CartRequestType } from '@/lib/types'

export const cartApi = {
    getCart: () => axiosCartClient.get("/cart"),
    addToCart: (data: CartRequestType) => axiosCartClient.post("/cart", data),
    removeItem: (productId: string, volume: number) => axiosCartClient.delete(`/cart/${productId}`, { data: {volume} })
}