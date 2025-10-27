import BestSell from '@/components/user/section/BestSell'
import Feature from '@/components/user/section/feature/Feature'
import Hero from '@/components/user/section/Hero'
import NewArrival from '@/components/user/section/NewArrival'

const HomePage = () => {
    return (
        <>
            <main>
                <Hero />
                <NewArrival />
                <BestSell />
                <Feature />
            </main>
        </>
    )
}

export default HomePage