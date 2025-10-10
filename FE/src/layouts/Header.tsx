import Actions from '@/components/header/actions/Actions'
import MenuAction from '@/components/header/actions/MenuAction'
import SearchAction from '@/components/header/actions/SearchAction'
import Logo from '@/components/header/Logo'
import NavBar from '@/components/header/nav/NavBar'
import SearchBar from '@/components/SearchBar'

const Header = () => {
    return (
        <>
            <header className="fixed top-0 left-0 w-full px-4 py-7 bg-background md:px-[50px] lg:px-[150px] shadow-md z-50">
                <div className="w-full flex justify-between items-center">
                    <div className="flex gap-1 md:hidden">
                        <MenuAction />
                        <SearchAction setStyle="max-md:inline-flex md:hidden" />
                    </div>
                    <Logo />
                    <NavBar />
                    <Actions />
                    <SearchBar />
                </div>
            </header>
        </>
    )
}

export default Header