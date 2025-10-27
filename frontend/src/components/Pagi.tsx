import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { setPage } from '@/redux/productListSlice'
import type { AppDispatch, RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'

const Pagi = () => {
    const totalPages = useSelector((state: RootState) => state.productList.totalPages)
    const page = useSelector((state: RootState) => state.productList.page)

    const dispatch = useDispatch<AppDispatch>()
    const handlePrevios = () => {
        if (page > 1) {
            dispatch(setPage(page - 1))
        }
    }

    const handleNext = () => {
        if (page < totalPages) {
            dispatch(setPage(page + 1))
        }
    }

    const handlePage = (curr: number | string) => {
        dispatch(setPage(curr))
    }

    const generatePages = () => {
        const pageShow: Array<number | string> = []
        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++)
                pageShow.push(i)
        }
        else {
            if (page === 1) {
                pageShow.push(1, 2, 3, "...", totalPages)
            }
            else if (page === totalPages) {
                pageShow.push(1, "...", totalPages - 2, totalPages - 1, totalPages)
            }
            else {
                pageShow.push(1, 2, "...", page, "...", totalPages - 1, totalPages)
            }
        }

        return pageShow
    }

    const pages = generatePages()

    return (
        <Pagination>
            <PaginationContent className='rounded-md border p-1 shadow-xs'>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={handlePrevios}
                        className={cn("cursor-pointer", page === 1? "pointer-events-none opacity-50" : "pointer-events-auto")}
                    />
                </PaginationItem>

                {
                    pages.map((p) => (
                        <PaginationItem
                            className={cn("cursor-pointer")}
                        >
                            {
                                p === "..." && typeof p === "string"
                                    ? <PaginationLink
                                        className="pointer-events-none"
                                    >
                                        {p}
                                    </PaginationLink>
                                    : <PaginationLink
                                        onClick={() => handlePage(p)}
                                        className={cn("cursor-pointer", page === p && "border border-primary text-primary")}
                                    >{p}</PaginationLink>
                            }
                        </PaginationItem>
                    ))
                }

                <PaginationItem>
                    <PaginationNext
                        onClick={handleNext}
                        className={cn("cursor-pointer", page === totalPages? "pointer-events-none opacity-50" : "pointer-events-auto")}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default Pagi
