import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Heart } from 'lucide-react'

interface Props {
    img: string
    desName: string
}

const ProductTop = ({ img, desName }: Props) => {
    return (
        <>
            <div className="w-full h-80 relative group">
                <img src={img} alt={desName}
                    className="size-full object-center transition-all duration-300"
                />
                <div className="flex flex-col gap-1 absolute top-0 left-0 pointer-events-none ">
                    <Badge variant="destructive">discount</Badge>
                    <Badge className="bg-chart-2">-20%</Badge>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button
                        className="cursor-pointer bg-neutral-500"
                    >
                        <Heart />
                    </Button>
                    <Button
                        className="cursor-pointer bg-neutral-500"
                    >
                        <Eye />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ProductTop