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
    const sort = useSelector((state: RootState) => state.productSort.sort)
    const page = useSelector((state: RootState) => state.productList.page)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchAllProduct({ ...filters, sort, page, limit: 12 }))
    }, [filters, sort, page]
    )

    if (loading === "loading")
        return (<Loading />)
    if (loading === "failed" || !items.length)
        return (<Empty content="Không tìm thấy sản phẩm" />)

    return (
        <>
            <div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {
                        loading === "success" && Array.isArray(items) ? (
                            items.map(product => (<li key={product._id}>
                                <ProductItem product={product}/>
                            </li>))
                        ) : (<Empty content="Không tìm thấy sản phẩm" />)
                    }
                </ul>
            </div>
        </>
    )
}

export default ProductList