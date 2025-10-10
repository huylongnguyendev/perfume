import { Button } from '@/components/ui/button'
import Section from '@/layouts/Section'
import hero from '@assets/hero.jpg'

const HomePage = () => {
  return (
    <>
      <Section styleSection="h-dvh text-center">
        <img src={hero} alt="hero banner"
          className="absolute top-0 size-full object-cover -z-1 before:absolute before:size-full before:bg-primary before:top-0 before:left-0 before:z-1"
        />
        <h1 className="mt-80 text-2xl md:text-4xl font-semibold uppercase flex flex-col text-center text-shadow-lg">
          <span className="md:leading-12">Hương thơm độc đáo</span>
          <span className="md:leading-12">phong cách tinh tế</span>
        </h1>
        <p className='w-96 mt-4 mx-auto text-secondary-foreground'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo velit doloremque distinctio. Dolores, culpa repellendus!
        </p>
        <Button
          size="lg"
          className="cursor-pointer mt-4"
        >Khám phá ngay</Button>
      </Section>
    </>
  )
}

export default HomePage