import { Search, X } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { cn } from "@/lib/utils"
import { switchSearch } from "@/redux/toggleSlice"

const SearchBar = () => {
    const toggleSearch = useSelector((state: RootState) => state.toggleSwitch.searchToggle)
    const dispatch = useDispatch<AppDispatch>()
    return (
        <>
            <div className={cn("absolute w-11/12 md:w-3xl -right-full top-28 transition-all duration-75", toggleSearch && "right-4")}>
                <div className="absolute w-full shadow-lg z-10">
                    <Search
                        className="absolute size- top-1/2 left-1 -translate-y-1/2"
                    />
                    <Input
                        placeholder="Tìm kiếm..."
                        className="w-full bg-background ps-8 pe-28 py-5 text-lg!"
                    />
                    <Button
                        className="absolute top-1/2 -translate-y-1/2 right-0 py-5 text-lg"
                    >Tìm kiếm</Button>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        className={cn("text-red-500 rounded-full cursor-pointer absolute top-12 right-0 z-1 before:w-4 before:h-0 opacity-0 before:absolute before:bg-primary before:-top-4 before:transition-all before:duration-500", toggleSearch && "before:w-px before:h-4 opacity-100")}
                        onClick={()=>dispatch(switchSearch())}
                    >
                        <X />
                    </Button>
                </div>

            </div>
        </>
    )
}

export default SearchBar