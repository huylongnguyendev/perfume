import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { useEffect } from 'react'
import { fecthOneProduct } from '@/redux/productSlice'

import ImgDetail from '@/components/details/imgDetail'
import InfoDetail from '@/components/details/InfoDetail'
import Loading from '@/components/Loading'
import Empty from '@/components/Empty'


const ProductDetail = () => {
    const { id } = useParams()
    const { item, loading } = useSelector((state: RootState) => state.product)
    const dispatch = useDispatch<AppDispatch>()



    useEffect(() => {
        if (id)
            dispatch(fecthOneProduct(id))
    }, [])
    if (loading === "loading")
        return (<Loading />)
    if (loading === "failed" || !item)
        return (<Empty content="Không tìm thấy sản phẩm" />)

    return (
        <>
            {
                loading === "success" && (
                    <div className="mt-[90px] px-4 md:px-12 lg:px-16 md:flex gap-5 space-y-1">
                        <ImgDetail />
                        <InfoDetail item={item} />
                    </div>
                )
            }
        </>
    )
}

export default ProductDetail