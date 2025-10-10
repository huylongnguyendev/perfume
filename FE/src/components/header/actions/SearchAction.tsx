import { Button } from '@/components/ui/button'
import type { AppDispatch, RootState } from '@/redux/store'
import { switchSearch } from '@/redux/toggleSlice'
import { Search, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
    setStyle?: string
}

const SearchAction = ({ setStyle }: Props) => {
    const searchToggle = useSelector((state: RootState) => state.toggleSwitch.searchToggle)
    const dispatch = useDispatch<AppDispatch>()
    return (
        <>
            <Button
                variant="outline"
                size="icon"
                onClick={() => dispatch(switchSearch())}
                className={`cursor-pointer rounded-full max-md:hidden ${setStyle}`}
            >
                {
                    searchToggle &&
                    <X /> ||
                    <Search />
                }
            </Button>
        </>
    )
}

export default SearchAction