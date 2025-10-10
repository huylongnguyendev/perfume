import type { PageType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

interface Props {
    pages: PageType
    handleActivePage: (id: number) => void
}

const NavItem = ({ pages, handleActivePage }: Props) => {
    return (
        <>
            <li
                className={cn("text-lg max-md:p-2 text-muted-foreground relative before:absolute before:w-0 before:h-px before:bg-primary before:bottom-0 before:transition-all before:duration-300 hover:before:w-full", pages.isActive && "before:w-full text-primary")}
                onClick={()=>handleActivePage(pages.id)}
            >
                <Link to={pages.url}>{pages.name}</Link>
            </li>
        </>
    )
}

export default NavItem