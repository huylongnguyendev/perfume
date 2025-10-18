import ProductHead from './pieces/ProductHead'
import prd from '@/assets/prd_3.png'
import { ProductTitile } from './pieces/ProductTitile'
import ProductContent from './pieces/ProductContent'

const ProductItem = () => {
    return (
        <>
            <div className="rounded-xl overflow-hidden shadow-md bg-card">
                <ProductHead variant="item" imgUrl={prd} imgAlt="producname"/>
                <div className="p-4">
                    <ProductTitile variant="item" brand="Dior" name="product name" />
                    <ProductContent variant="item" price={15000000} desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus reprehenderit eligendi ad earum! Voluptas, aut?"  />
                </div>
            </div>
        </>
    )
}

export default ProductItem