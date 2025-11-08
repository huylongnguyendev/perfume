import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { setSort } from '@/redux/productSort'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/redux/store'
import { setFilters } from '@/redux/productFilterSlice'
interface Props {
    sort?: string
    filter?: string
}

const ShowMore = ({ sort, filter }: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const handleGotoProduct = () => {
        dispatch(setSort(sort))
        dispatch(setFilters({ brand: filter }))
        navigate("products")
    }

    return (
        <>
            <div className="text-right w-full mt-6">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleGotoProduct}
                    className="cursor-pointer hover:text-primary"
                >
                    Xem thêm
                </Button>
            </div>
        </>
    )
}

export default ShowMore