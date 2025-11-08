import Section from '@/layouts/user/Section'
import { featureList } from '@/lib/data'
import FeatureItem from './FeatureItem'

const Feature = () => {
    const features = featureList
    return (
        <>
            <Section title="Vì sao nên chọn Perfumei" sectionStyle="bg-secondary py-6 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                    {
                        features.map(feature => <FeatureItem key={feature.name} feature={feature} />)
                    }
                </div>
            </Section>
        </>
    )
}

export default Feature