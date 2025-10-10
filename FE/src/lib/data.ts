import type { PageType } from './types'

export const PageList: Array<PageType> = [
    {
        id: 1,
        name: "Trang chủ",
        url: "/",
        isActive: true
    },
    {
        id: 2,
        name: "Giới thiệu",
        url: "/introduction",
        isActive: false
    },
    {
        id: 3,
        name: "Sản phẩm",
        url: "/products",
        isActive: false
    },
    {
        id: 4,
        name: "Tin tức",
        url: "/news",
        isActive: false
    },
    {
        id: 5,
        name: "Liên hệ",
        url: "/contact",
        isActive: false
    },
]