import Cart from '@/components/user/cart/Cart'
import ActionsLeft from '@/components/user/header/actions/ActionsLeft'
import ActionsRight from '@/components/user/header/actions/ActionsRight'
import NavBar from '@/components/user/header/navbar/NavBar'
import Logo from '@/components/user/Logo'

const Header = () => {
    return (
        <>
            <header className="fixed w-full top-0 left-0 z-50 flex justify-between items-center bg-background/95 py-4 px-4 md:px-12 lg:px-16 shadow-md backdrop:backdrop-blur-lg">
                <ActionsLeft />
                <Logo />
                <NavBar />
                <ActionsRight />
                <Cart />
            </header>
        </>
    )
}

export default Header