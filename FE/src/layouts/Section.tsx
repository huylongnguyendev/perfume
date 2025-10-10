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
            <section className={`${styleSection}`}>
                {title && <h2 className={`text-lg text-primary font-semibold ${styleTitle}`}>{title}</h2>}
                {children}
            </section>
        </>
    )
}

export default Section