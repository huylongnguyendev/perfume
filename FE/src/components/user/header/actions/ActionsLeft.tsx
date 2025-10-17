import MenuAction from './MenuAction'
import SearchAction from './SearchAction'

const ActionsLeft = () => {
    return (
        <>
            <div className="space-x-1 md:hidden">
                <MenuAction />
                <SearchAction />
            </div>
        </>
    )
}

export default ActionsLeft