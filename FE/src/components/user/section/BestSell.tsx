import Section from '@/layouts/user/Section'
import ProductItem from '../product/ProductItem'
import ShowMore from '../ShowMore'

const BestSell = () => {
    return (
        <>
            <Section title="Nước hoa bán chạy">
                <ShowMore />
                <div className="mt-5">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        <li><ProductItem /></li>
                        <li><ProductItem /></li>
                        <li><ProductItem /></li>
                        <li><ProductItem /></li>
                    </ul>
                </div>
            </Section>
        </>
    )
}

export default BestSell