import CartAction from './CartAction'
import SearchAction from './SearchAction'
import UserAction from './UserAction'

const ActionsRight = () => {
  return (
    <>
      <div className="inline-flex gap-2 items-center">
        <SearchAction hidden="hidden"/>
        <CartAction />
        <UserAction />
      </div>
    </>
  )
}

export default ActionsRight