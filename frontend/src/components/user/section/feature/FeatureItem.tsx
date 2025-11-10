import type { FeatureType } from '@/lib/types'

interface Props {
    feature: FeatureType
}


const FeatureItem = ({ feature }: Props) => {
    return (
        <>
            <div className="bg-primary/20 text-muted-foreground rounded-xl flex items-center gap-5 p-4 shadow-lg">
                <div className="size-24 grid place-items-center shrink-0">
                    <feature.icon  className="scale-150 text-primary"/>
                </div>
                <div className="font-semibold" >
                    <h3 className="uppercase text-accent-foreground">{feature.name}</h3>
                    <p className="text-sm">{feature.desc}</p>
                </div>
            </div>
        </>
    )
}

export default FeatureItem