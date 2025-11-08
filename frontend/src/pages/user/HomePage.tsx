import { Button } from '@/components/ui/button'
import BestSell from '@/components/user/section/BestSell'
import Endow from '@/components/user/section/Endow'
import Feature from '@/components/user/section/feature/Feature'
import Hero from '@/components/user/section/Hero'
import NewArrival from '@/components/user/section/NewArrival'
import { cn } from '@/lib/utils'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const HomePage = () => {
    const [posY, setPosY] = useState<number>(0)

    useEffect(() => {
        const scrollYNumber = () => {
            setPosY(window.scrollY)
        }

        window.addEventListener("scroll", scrollYNumber)
        return () => window.removeEventListener("scroll", scrollYNumber)
    }, [posY])

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <>
            <main>
                <Hero />
                <NewArrival />
                <BestSell />
                <Endow />
                <Feature />
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleScrollToTop}
                    className={cn("rounded-full cursor-pointer fixed bottom-4 right-4 z-50 opacity-0 invisible transition-all duration-300", posY > 300 && "opacity-100 visible")}
                ><ArrowUp /></Button>
            </main>
        </>
    )
}

export default HomePage