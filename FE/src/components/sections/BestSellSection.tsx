import Section from '@/layouts/Section'
import { FilterRadio } from '../filters/FilterRadio'
import ProductList from '../product/ProductList'

const BestSellSection = () => {
    return (
        <>
            <Section title="Nước hoa đang bán chạy" styleTitle="text-center uppercase">
                <FilterRadio />
                <div >
                    ầljkfalkfjalf
                    dfjlhkadslkfjad
                    <ProductList />
                </div>
            </Section>
        </>
    )
}

export default BestSellSection