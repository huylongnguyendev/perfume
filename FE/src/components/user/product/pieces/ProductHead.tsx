
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Eye, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Props {
    variant?: "card" | "cart" | "item"
    imgUrl: string
    imgAlt: string
}

const ProductHead: React.FC<Props> = ({ variant, imgUrl, imgAlt }) => {
    return (
        <>
            <div className="relative flex justify-center items-center group">
                <img src={imgUrl} alt={imgAlt} width={144} height={144} className="transition-all duration-300 group-hover:scale-125" />
                {variant === "cart" || <div className={cn("absolute flex gap-1 z-10 transition-opacity duration-300", variant === "card" && "bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100" || "top-4 right-4 flex-col")  }>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon-sm"
                                className="cursor-pointer">
                                <Heart />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side={variant === "item" && "left" || "top"} className="bg-black text-muted py-1 px-2 rounded-md mr-1 mb-1 text-xs">Thêm vào yêu thích</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon-sm"
                                className="cursor-pointer">
                                <Link to="/product/:id">
                                    <Eye />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side={variant === "item" && "left" || "top"} className="bg-black text-muted py-1 px-2 rounded-md mr-1 mb-1 text-xs">Xem sản phẩm</TooltipContent>
                    </Tooltip>
                </div>}
            </div>
        </>
    )
}

export default ProductHead