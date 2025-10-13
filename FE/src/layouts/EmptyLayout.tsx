import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const EmptyLayout = () => {
    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center h-full">
                <h3 className="text-lg font-semibold text-muted-foreground">Giỏ hàng trống</h3>
                <Button>
                    <Link to="/products">Đi đến trang sản phẩm</Link>
                </Button>
            </div>
        </>
    )
}

export default EmptyLayout