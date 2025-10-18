import prd from '@/assets/prd_3.png'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

const ProductCart = () => {
    return (
        <>
            <div className="flex gap-2 rounded-md overflow-hidden">
                <img src={prd} alt="" className="w-24 object-cover" />
                <div className="flex justify-between w-full">
                    <div className="font-semibold">
                        <h4 className="text-lgl">Product Name</h4>
                        <div className="font-semibold -space-y-0.5 space-x-0.5">
                            <p className="text-sm text-muted-foreground">10ml</p>
                            <span className="line-through text-muted-foreground">price</span>
                            <span className="text-lg text-foreground">price</span>
                        </div>
                        <div className="mt-4 space-x-4">
                            <Button variant="outline" size="icon-sm" className="cursor-pointer">-</Button>
                            <span className="text-sm">1</span>
                            <Button variant="outline" size="icon-sm" className="cursor-pointer">+</Button>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon-sm" className="cursor-pointer"><Trash2 /> </Button>
                </div>

            </div>
        </>
    )
}

export default ProductCart