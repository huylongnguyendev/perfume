import Section from '@/layouts/user/Section'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/swiper.css'
import ShowMore from '../ShowMore'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { useEffect } from 'react'
import { fetchAllProduct } from '@/redux/productListSlice'
import { setFilters } from '@/redux/productFilterSlice'
import ProductCard from '@/components/product/ProductCard'

const NewArrival = () => {
    const items = useSelector((state: RootState) => state.productList.items)
    const filters = useSelector((state: RootState) => state.productFilter)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(setFilters({sort: "newest"}))
        dispatch(fetchAllProduct({filters, limit: 10}))
    },[])
    return (
        <>
            <Section title="Sản phẩm mới">
                <ShowMore sort="newest" />
                <Swiper
                    spaceBetween={20}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        555: {
                            slidesPerView: 1
                        },
                        600: {
                            slidesPerView: 2
                        },
                        1022: {
                            slidesPerView: 3
                        },
                        1350: {
                            slidesPerView: 4
                        },
                    }}
                    modules={[Autoplay]}
                    className="min-h-[399px] p-1! mt-5"
                >
                    {
                        items?.map(item => (
                            <SwiperSlide><ProductCard key={item._id} product={item}/></SwiperSlide>
                        ))
                    }
                </Swiper>
            </Section>
        </>
    )
}

export default NewArrival