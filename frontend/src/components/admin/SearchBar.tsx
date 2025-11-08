import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const SearchBar = () => {
    return (
        <>
            <div className="relative">
                <Input placeholder="Tìm kiếm..." />
                <Button className="cursor-pointer absolute top-1/2 right-0 -translate-y-1/2">
                    <Search />
                </Button>
            </div>
        </>
    )
}

export default SearchBar