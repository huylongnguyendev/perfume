import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'

const SearchFilter = () => {
    const [inputSearch, setInputSearch] = useState<string>("")
    return (
        <>
            <div>
                <div className=" relative">
                    <Input
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
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