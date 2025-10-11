import { Button } from '@/components/ui/button'
import Section from '@/layouts/Section'
import hero from '@assets/hero.jpg'
import { Link } from 'react-router-dom'

const HerroSection = () => {
    return (
        <>
            <Section styleSection="h-screen text-center relative px-0!">
                <img src={hero} alt="hero banner"
                    className="absolute top-0 size-full object-cover -z-1 before:absolute before:size-full before:bg-primary before:top-0 before:left-0 before:z-1"
                />
                <h1 className="pt-72 md:pt-80 text-2xl md:text-4xl font-semibold uppercase flex flex-col text-center text-shadow-lg">
                    <span className="md:leading-12">Hương thơm độc đáo</span>
                    <span className="md:leading-12">phong cách tinh tế</span>
                </h1>
                <p className='w-96 mt-4 mx-auto text-secondary-foreground'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo velit doloremque distinctio. Dolores, culpa repellendus!
                </p>
                <Button
                    size="lg"
                    className="cursor-pointer mt-4"
                >
                    <Link to="/products">Khám phá ngay</Link>
                </Button>
            </Section>
        </>
    )
}

export default HerroSection