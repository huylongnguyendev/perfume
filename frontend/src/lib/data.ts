import { Award, Facebook, IdCard, Truck, Twitter, Youtube } from 'lucide-react'
import type { FeatureType, GenderType, LinkIconType, LinkType, PageType, SortType } from './types'

export const listPage: Array<PageType> = [
    {
        id: 1,
        name: "trang chủ",
        url: "/",
        isActive: true
    },
    {
        id: 2,
        name: "giới thiệu",
        url: "/shop/about-us",
        isActive: false
    },
    {
        id: 3,
        name: "sản phẩm",
        url: "/shop/products",
        isActive: false
    },
    {
        id: 4,
        name: "liên hệ",
        url: "/shop/contact",
        isActive: false
    },
    {
        id: 5,
        name: "quản lý",
        url: "/admin",
        isActive: false
    },
]

export const featureList: Array<FeatureType> = [
    {
        id: 11,
        name: "Sản phẩm chất lượng",
        desc: "Sản phẩm chính hãng từ các hãng nước hoa, cam kết Authentic 100%",
        icon: Award,
    },
    {
        id: 12,
        name: "Giao hàng miễn phí & nhanh chóng",
        desc: "Giao hàng tận nơi miễn phí trên toàn quốc, trong vòng tối đa 3 ngày",
        icon: Truck,
    },
    {
        id: 12,
        name: "Ưu đãi hấp dẫn",
        desc: "Trở thành FumeiMember nhận các chương trình ưu đãi lên đến 10% và nhận được nhiều ưu đãi từ các chương trình khuyến mãi khác (có thể áp dụng nhiều ưu đãi cùng lúc)",
        icon: IdCard,
    },
]

export const linkList: Array<LinkType> = [
    {
        id: 21,
        name: "Chính sách và quy định chung",
        url: "/"
    },
    {
        id: 22,
        name: "Chính sách bảo mật",
        url: "/"
    },
    {
        id: 23,
        name: "Vận chuyển và giao hàng",
        url: "/"
    },
    {
        id: 24,
        name: "Mua hàng và thanh toán",
        url: "/"
    },
]

export const listIconLink: Array<LinkIconType> = [
    {
        id: 25,
        icon: Facebook,
        url: "/"
    },
    {
        id: 26,
        icon: Youtube,
        url: "/"
    },
    {
        id: 27,
        icon: Twitter,
        url: "/"
    },
]

export const genders: Array<GenderType> = [
    {
        label: "Tất cả",
        value: "All",
        isActive: true
    },
    {
        label: "Nam",
        value: "Nam",
        isActive: false
    },
    {
        label: "Nữ",
        value: "Nữ",
        isActive: false
    },
    {
        label: "Unisex",
        value: "Unisex",
        isActive: false
    },
]

export const sortList: Array<SortType> = [
    {
        label: "Tất cả",
        value: "default"
    },
    {
        label: "Mới nhất",
        value: "newest"
    },
    {
        label: "Giá tăng dần",
        value: "priceAsc"
    },
    {
        label: "Giá giảm dần",
        value: "priceDesc"
    },
]