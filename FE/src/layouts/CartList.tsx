import ItemCart from '@/components/product/ItemCart'

const CartList = () => {
    return (
        <>
            <ul className="rounded-xl p-2 space-y-2">
                <ItemCart />
                <ItemCart />
            </ul>
        </>
    )
}

export default CartList