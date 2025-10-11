import type React from 'react'
import type { ReactNode } from 'react'

interface Props {
    title?: string
    styleSection?: string
    styleTitle?: string
    children: ReactNode
}

const Section: React.FC<Props> = ({ title, styleSection, styleTitle, children }) => {
    return (
        <>
            <section className={`px-4 md:px-[50px] lg:px-[150px] ${styleSection}`}>
                {title && <h2 className={`text-2xl md:text-3xl text-primary font-semibold py-8 ${styleTitle}`}>{title}</h2>}
                {children}
            </section>
        </>
    )
}

export default Section