import type { PageType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

interface Props {
    page: PageType
    handleActivePage: (id: number) => void
}

const NavItem = ({ page, handleActivePage }: Props) => {
    return (
        <>
            <li
                className={cn("font-semibold text-muted-foreground relative transition-colors duration-300 hover:text-primary before:absolute before:w-0 before:h-px before:bg-primary before:bottom-0 before:transition-all before:duration-300 hover:before:w-1/2", page.isActive && "text-primary before:w-full")}
                onClick={() => handleActivePage(page.id)}
            >
                <Link to={page.url}>{page.name}</Link>
            </li>
        </>
    )
}

export default NavItem