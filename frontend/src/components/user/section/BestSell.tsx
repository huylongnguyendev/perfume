import Section from '@/layouts/user/Section'
import ShowMore from '../ShowMore'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import ProductCard from '@/components/product/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { useEffect } from 'react'
import { fetchAllProduct } from '@/redux/productListSlice'

const BestSell = () => {
    const items = useSelector((state: RootState) => state.productList.items)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchAllProduct({sort: "priceAsc"}))
    },[dispatch])

    return (
        <>
            <Section title="Nước hoa bán chạy">
                <ShowMore sort="priceAsc" />
                <div className="mt-5">
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
                            items.map(item => (
                                <SwiperSlide><ProductCard key={item._id} product={item} /></SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </Section>
        </>
    )
}

export default BestSell