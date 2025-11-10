import type { PageType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

interface Props {
  page: PageType
  handleSetActivePage: (id: number) => void
}

const NavItem = ({ page, handleSetActivePage }: Props) => {
  return (
    <>
      <li className={cn("text-muted-foreground uppercase font-semibold group relative before:absolute before:w-0 before:h-px before:bg-primary before:bottom-0 before:transition-all before:duration-300 hover:before:w-full", page.isActive && "before:w-full text-primary")}
        onClick={() => handleSetActivePage(page.id)}
      >
        <Link to={page.url}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center w-full">
          <span className="transition-colors duration-300 group-hover:text-primary">{page.name}</span>
        </Link>
      </li>
    </>
  )
}

export default NavItem