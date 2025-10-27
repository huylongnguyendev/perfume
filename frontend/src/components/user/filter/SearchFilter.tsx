import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { setFilters } from '@/redux/productFilterSlice'
import type { AppDispatch, RootState } from '@/redux/store'
import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

const SearchFilter = () => {

    const search = useSelector((state: RootState) => state.productFilter.search)
    const dispacth = useDispatch<AppDispatch>()

    return (
        <>
            <div>
                <div className=" relative">
                    <Input
                        value={search}
                        onChange={(e) => dispacth(setFilters({search: e.target.value}))}
                        placeholder="Tìm kiếm..."
                        className="bg-background py-5 pe-10"
                    />
                    <Button
                        variant="outline"
                        size="icon-sm"
                        className="cursor-pointer absolute right-1 top-1/2 -translate-y-1/2"
                    >
                        <Search />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SearchFilter