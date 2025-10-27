import Section from '@/layouts/user/Section'
import ShowMore from '../ShowMore'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import ProductItem from '../../product/ProductItem'

const Relative = () => {
    return (
        <>
            <Section title="Sản phẩm liên quan">
                <ShowMore />
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
                    <SwiperSlide><ProductItem /></SwiperSlide>
                    <SwiperSlide><ProductItem /></SwiperSlide>
                    <SwiperSlide><ProductItem /></SwiperSlide>
                    <SwiperSlide><ProductItem /></SwiperSlide>
                    <SwiperSlide><ProductItem /></SwiperSlide>
                    <SwiperSlide><ProductItem /></SwiperSlide>
                    <SwiperSlide><ProductItem /></SwiperSlide>
                    <SwiperSlide><ProductItem /></SwiperSlide>
                    <SwiperSlide><ProductItem /></SwiperSlide>
                    <SwiperSlide><ProductItem /></SwiperSlide>

                </Swiper>
            </Section>
        </>
    )
}

export default Relative