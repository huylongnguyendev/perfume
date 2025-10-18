import ProductHead from './pieces/ProductHead'
import prd from '@/assets/prd_3.png'
import { ProductTitile } from './pieces/ProductTitile'
import ProductContent from './pieces/ProductContent'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

const ProductCard = () => {
    return (
        <>
            <div className="rounded-xl overflow-hidden shadow-md bg-card p-2">
                <ProductHead variant="card" imgUrl={prd} imgAlt="producname" />
                <div className="p-4 space-y-4">
                    <ProductTitile variant="card" brand="Dior" name="product name" />
                    <ProductContent variant="card" price={15000000} desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus reprehenderit eligendi ad earum! Voluptas, aut?" />
                </div>
                <Button
                    className="w-full cursor-pointer"
                >
                    <ShoppingCart />
                    <span>Thêm vào giỏ hàng</span>
                </Button>
            </div>
        </>
    )
}

export default ProductCard