import Actions from '@/components/header/Actions'
import CartDrawser from '@/components/header/CartDrawser'
import Logo from '@/components/header/Logo'
import MenuAction from '@/components/header/MenuAction'
import NavBar from '@/components/header/NavBar'
import SearchBar from '@/components/SearchBar'

const Header = () => {
    return (
        <>
            <header
                className="font-OpenSans fixed px-4 md:px-16 lg:px-32 py-7 top-0 left-0 w-full z-40 shadow-md flex justify-between items-center">
                <MenuAction />
                <Logo />
                <NavBar />
                <Actions />
                <SearchBar />
                <CartDrawser />
            </header>
        </>
    )
}

export default Header