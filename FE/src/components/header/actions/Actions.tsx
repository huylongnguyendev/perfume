import CartAction from './CartAction'
import SearchAction from './SearchAction'
import UserAction from './UserAction'

const Actions = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <SearchAction />
        <UserAction />
        <CartAction />
      </div>
    </>
  )
}

export default Actions