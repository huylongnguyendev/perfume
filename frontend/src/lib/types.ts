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

export interface User {
    _id: string
    username: string
    password: string
    displayName: string
    phone: string
    email: string
    avatarUrl: string
    admin: boolean
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
    onStock?: number    // Số lượng tồn kho, mặc định 0
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
    images?: string[]  
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