import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const ShowMore = () => {
    return (
        <>
            <div className="text-right w-full mt-6">
                <Button
                    variant="ghost"
                    size="sm"
                    className="hover:text-primary"
                >
                    <Link to="/products" className="inline-flex justify-center items-center size-full">Xem thêm</Link>
                </Button>
            </div>
        </>
    )
}

export default ShowMore