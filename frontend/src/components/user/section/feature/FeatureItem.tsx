import type { FeatureType } from '@/lib/types'

interface Props {
    feature: FeatureType
}


const FeatureItem = ({ feature }: Props) => {
    return (
        <>
            <div className="bg-card text-muted-foreground rounded-xl flex items-center gap-5 p-4">
                <div className="size-24 grid place-items-center shrink-0">
                    <feature.icon  className="scale-120"/>
                </div>
                <div className="font-semibold" >
                    <h3 className="text-lg uppercase text-accent-foreground">{feature.name}</h3>
                    <p className="text-sm">{feature.desc}</p>
                </div>
            </div>
        </>
    )
}

export default FeatureItem