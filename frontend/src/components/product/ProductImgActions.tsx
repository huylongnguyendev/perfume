import { Eye, Heart } from 'lucide-react'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Link } from 'react-router-dom'

interface Props {
    id: string
}

const ProductImgActions = ({ id }: Props) => {
    return (
        <>
            <div className="gap-1 absolute bottom-4 left-1/2 -translate-1/2 space-x-1 opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size="icon-sm"
                            className="cursor-pointer"
                        >
                            <Heart />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Thêm vào yêu thích</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size="icon-sm"
                            className="cursor-pointer"
                        >
                            <Link
                                to={`/shop/products/${id}`}
                                className="inline-flex size-full justify-center items-center"
                            >
                                <Eye />
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Xem nhanh sản phẩm</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </>
    )
}

export default ProductImgActions