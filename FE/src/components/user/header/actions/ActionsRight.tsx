import CartAction from './CartAction'
import SearchAction from './SearchAction'
import UserAction from './UserAction'

const ActionsRight = () => {
  return (
    <>
      <div className="space-x-1">
        <SearchAction hidden="hidden"/>
        <CartAction />
        <UserAction />
      </div>
    </>
  )
}

export default ActionsRight