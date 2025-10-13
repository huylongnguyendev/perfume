import CartAction from '../CartAction'
import SearchAction from '../SearchAction'
import UserAction from '../UserAction'

const Actions = () => {

    return (
        <>
            <div className="flex gap-2">
                <SearchAction />
                <CartAction />
                <UserAction />
            </div>
        </>
    )
}

export default Actions