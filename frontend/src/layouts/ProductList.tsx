import Empty from '@/components/Empty'
import Loading from '@/components/Loading'
import ProductItem from '@/components/product/ProductItem'
import { fetchAllProduct } from '@/redux/productListSlice'
import type { AppDispatch, RootState } from '@/redux/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProductList = () => {
    const { items, loading } = useSelector((state: RootState) => state.productList)
    const filters = useSelector((state: RootState) => state.productFilter)
    const page = useSelector((state: RootState) => state.productList.page)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchAllProduct({ ...filters, page, limit: 12 }))
    }, [filters, page])

    if (loading === "loading")
        return (<Loading />)
    if (loading === "failed" || !items.length)
        return (<Empty content="Không tìm thấy sản phẩm" />)

    return (
        <>
            <div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        loading === "success" && (
                            items.map(product => (<li key={product._id}>
                                <ProductItem product={product} />
                            </li>))
                        )
                    }
                </ul>
            </div>
        </>
    )
}

export default ProductList