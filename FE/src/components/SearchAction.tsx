import { Button } from './ui/button'
import { Search } from 'lucide-react'
import type { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { switchSearch } from '@/redux/toggleSlice'

const SearchAction = () => {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <>
            <Button
                variant="outline"
                size="icon"
                onClick={()=>dispatch(switchSearch())}
                className="cursor-pointer rounded-full"
            >
                <Search />
            </Button>
        </>
    )
}

export default SearchAction