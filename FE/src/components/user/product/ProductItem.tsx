import prd from '@/assets/prd_3.png'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Eye, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductItem = () => {
    return (
        <>
            <div className="rounded-xl overflow-hidden shadow-md bg-card">
                <div className="relative flex justify-center items-center">
                    <img src={prd} alt="product name" width={144} height={144} />
                    <div className="absolute top-4 right-4 flex flex-col gap-1 z-10">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon-sm"
                                    className="cursor-pointer">
                                    <Heart />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side='left' className="bg-black text-muted py-1 px-2 rounded-md mr-1 text-xs">Thêm vào yêu thích</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon-sm"
                                    className="cursor-pointer">
                                    <Link to="/">
                                        <Eye />
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side='left' className="bg-black text-muted py-1 px-2 rounded-md mr-1 text-xs">Xem sản phẩm</TooltipContent>
                        </Tooltip>
                    </div>
                </div>
                <div className="p-4">
                    <div className="font-semibold text-muted-foreground space-y-1">
                        <h3 className="uppercase text-card-foreground line-clamp-1">product name</h3>
                        <div className="text-right">
                            <p className="text-xs line-through">15,000,000</p>
                            <p className="text-lg">10,000,000</p>
                        </div>
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa eum impedit, labore, error reiciendis amet porro officiis eius alias ipsum reprehenderit. Omnis blanditiis quas magnam itaque, enim illo ut provident.</p>
                </div>
            </div>
        </>
    )
}

export default ProductItem