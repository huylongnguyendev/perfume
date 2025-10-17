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