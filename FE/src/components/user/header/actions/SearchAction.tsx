import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

interface Props {
  hidden?: "hidden" | "null"
}

const SearchAction = ({hidden}: Props) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={cn("cursor-pointer rounded-full", hidden && "max-md:hidden")}
      >
        <Search />
      </Button>
    </>
  )
}

export default SearchAction