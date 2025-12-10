import type { LucideProps } from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

export interface PageType {
  id: number
  name: string
  url: string
  isActive: boolean
}

export interface FeatureType {
  id: number
  name: string
  desc: string
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export interface LinkType {
  id: number
  name: string
  url: string
}

export interface LinkIconType {
  id: number
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  url: string
}

type ScentsType = {
  top: Array<string>
  middle: Array<string>
  base: Array<string>
}

export type VolumeType = {
  sku: string         // Mã định danh cho từng thể tích
  size: number        // Dung tích (ml)
  priceOrig: number
  price: number       // Giá gốc
  discount: number   // Giảm giá (%), mặc định 0
  onStock: number    // Số lượng tồn kho, mặc định 0
}

export type VolumeAddType = {
  sku: string         // Mã định danh cho từng thể tích
  size: number        // Dung tích (ml)
  priceOrig: number
  discount: number   // Giảm giá (%), mặc định 0
  onStock: number    // Số lượng tồn kho, mặc định 0
}

export interface ProductType {
  _id: string
  name: string
  brand: string
  description: string
  gender: "Nam" | "Nữ" | "Unisex"
  category: string
  scents: ScentsType
  volumes: Array<VolumeType>
  images: string[]
}

export interface ProductAddType {
  name: string
  brand: string
  description: string
  gender: "Nam" | "Nữ" | "Unisex"
  category: string
  scents: ScentsType
  volumes: Array<VolumeAddType>
  images?: string[]
}

export interface ProductCartType {
  _id: string
  name: string
  brand: string
  description: string
  gender: "Nam" | "Nữ" | "Unisex"
  category: string
  scents: ScentsType
  images: string[]
}

export interface ProductListResponse {
  products: Array<ProductType>
  totalPages: number
  totalItems: number
}

export interface GenderType {
  label: string
  value: "Nam" | "Nữ" | "Unisex" | "All"
  isActive: boolean
}

export interface SortType {
  label: string
  value: "default" | "newest" | "priceAsc" | "priceDesc"
}

export interface BrandType {
  _id: string
  name: string
}

export interface UserSignIn {
  userSignin: string
  password: string
}
export interface UserSignUp {
  username: string
  password: string
  fullName: string
  phoneNumber: string
  email?: string | null
  address: string
  admin?: boolean
}

export interface User {
  _id: string
  username: string
  fullName: string
  phoneNumber: string
  address: string
  admin: boolean
  role: "admin" | "user"
}

export interface UserResponse {
  message: string
  user: User
  accessToken: string
}

export interface CartResponse {
  _id: string
  userId: string
  cart: {
    items: Array<CartItemType>
  }
  message: string
}

export interface CartItemType {
  productId: ProductCartType
  quantity: number
  selectedVolume: CartVolumeType
}

export interface CartVolumeType {
  volume: number
  priceOrig: number
  price: number
  discount: number
}

export interface CartRequestType {
  productId: string
  quantity: number
  selectedVolume: CartVolumeType
}

export interface CrumbType {
  name: string
  value: string
  url: string
}