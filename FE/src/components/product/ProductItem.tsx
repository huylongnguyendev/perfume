import product from '@assets/prd_14.png'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import ProductTop from './product-piece/ProductTop'
import ProductName from './product-piece/ProductName'
import ProductSelectSize from './product-piece/ProductSelectSize'
import ProductPrice from './product-piece/ProductPrice'

const ProductItem = () => {
    return (
        <>
            <div className="w-80 shadow-md ml-4 p-4 rounded-xl transition-all duration-300 hover:shadow-lg bg-card space-y-2">
                <ProductTop img={product} desName="" />
                <ProductName brand="dior" name="name" />
                <ProductSelectSize />
                <ProductPrice />
                <Button className="w-full cursor-pointer">
                    <ShoppingCart />
                    <span>
                        Add to cart
                    </span>
                </Button>

            </div>
        </>
    )
}

export default ProductItem