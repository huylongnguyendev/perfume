import type { LinkIconType, LinkType } from '@/lib/types'
import { Link } from 'react-router-dom'

interface Props {
    link?: LinkType
    linkIcon?: LinkIconType
}
const FooterItem = ({ link, linkIcon }: Props) => {
    return (
        <>
            <li className="text-sm text-accent-foreground font-semibold transition-colors duration-300 hover:text-primary first-letter:uppercase">
                {
                    link && <Link to={link.url}>{link.name}</Link> ||
                    linkIcon && <Link to={linkIcon.url}>{<linkIcon.icon />}</Link>
                }
            </li>
        </>
    )
}

export default FooterItem