import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  title?: string
  titleStyle?: string
  sectionStyle?: string
  children?: ReactNode
}

const Section: React.FC<Props> = ({ title, titleStyle, sectionStyle, children }) => {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}

        className={`mt-10 px-4 md:px-12 lg:px-16 ${sectionStyle}`}>
        {title && <h2 className={`text-2xl font-semibold w-fit mx-auto uppercase relative before:w-2/3 before:h-1 before:absolute before:bg-gradient-to-r before:from-primary/20 before:indigo-500 before:via-purple-500 before:to-pink-500 before:bottom-0 before:right-0  before:rounded-full py-1 ${titleStyle}`}>{title}</h2>}
        {children}
      </motion.section>
    </>
  )
}

export default Section