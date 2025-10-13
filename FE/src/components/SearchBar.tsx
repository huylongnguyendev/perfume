import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { cn } from '@/lib/utils'
import { switchSearch } from '@/redux/toggleSlice'

const SearchBar = () => {
    const [inputContent, setInputContent] = useState<string>("")
    const toggleSearch = useSelector((state: RootState) => state.toggleSwitch.searchToggle)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <>
            <div className={cn("absolute w-full h-48 md:h-24 px-4 md:px-16 lg:px-96 z-50 bg-background -top-96 left-0 shadow-md transition-all duration-300", toggleSearch && "top-0")}>
                <form className="relative w-full top-1/2 -translate-y-1/2">
                    <Search className="size-5 absolute left-3 top-1/2 -translate-1/2" />
                    <Input
                        value={inputContent}
                        onChange={(e) => setInputContent(e.target.value)}
                        placeholder="Tìm kiếm..."
                        className="ps-6 py-5 pe-32 text-lg! placeholder:text-muted-foreground"
                    />
                    <Button
                        type="submit"
                        size="lg"
                        className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 text-lg"
                    >
                        Tìm kiếm
                    </Button>
                </form>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch(switchSearch())}
                    className="cursor-pointer absolute right-4 top-4 rounded-full"
                >
                    <X className="text-red-500" />
                </Button>
            </div>
        </>
    )
}

export default SearchBar