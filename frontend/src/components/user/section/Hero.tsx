import Section from '@/layouts/user/Section'
import hero from '@/assets/hero.jpg'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowUpRightFromCircle } from 'lucide-react'

const Hero = () => {
    return (
        <>
            <Section sectionStyle="mt-0! px-0! relative h-dvh grid place-items-center">
                <img src={hero} alt="hero banner" className="absolute size-full object-cover brightness-50 -z-10" />
                <div className="text-center px-4 space-y-10">
                    <h1 className="text-2xl md:text-3xl text-muted uppercase font-semibold">Khám phá hương thơm độc đáo, tinh tế và sang trọng</h1>
                    <Button
                        variant="default"
                    >
                        <Link to="/products" className="inline-flex gap-1 items-center size-full">
                            <span className="uppercase">Khám phá ngay</span>
                            <ArrowUpRightFromCircle />
                        </Link>
                    </Button>
                </div>
            </Section>
        </>
    )
}

export default Hero