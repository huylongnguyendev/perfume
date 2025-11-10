import Section from '@/layouts/user/Section'
import { featureList } from '@/lib/data'
import FeatureItem from './FeatureItem'
import { motion } from 'framer-motion'

const Feature = () => {
  const features = featureList
  return (
    <>
      <Section title="Vì sao nên chọn Perfumei" sectionStyle="bg-indigo-50 py-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {
            features.map((feature, index) => (
              <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}          
              >

                <FeatureItem key={feature.name} feature={feature} />
              </motion.div>
            ))}
        </div>
      </Section>
    </>
  )
}

export default Feature