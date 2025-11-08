import emptyImg from '@/assets/empty-folder.png'
import { Button } from '@/components/ui/button'
import { resetFilters } from '@/redux/productFilterSlice'
import type { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'

interface Props {
    content: string
}

const Empty: React.FC<Props> = ({ content }) => {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <img src={emptyImg} alt="empty-data" width={280} height={280} className="" />
                <div className="space-y-4 text-center">
                    <h2 className="text-xl font-semibold">{content}</h2>
                    <Button
                        onClick={() => dispatch(resetFilters())}
                        className="cursor-pointer"
                    >
                        Xem tiếp sản phẩm
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Empty