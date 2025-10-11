import { Button } from '@/components/ui/button'

const ProductSelectSize = () => {
    return (
        <>
            <div className="flex justify-center items-center gap-1">
                <Button 
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                >10ml</Button>
                <Button 
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                >50ml</Button>
                <Button 
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                >100ml</Button>
            </div>
        </>
    )
}

export default ProductSelectSize