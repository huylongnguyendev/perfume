import Section from '@/layouts/user/Section'
import ShowMore from '../ShowMore'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import ProductCard from '@/components/product/ProductCard'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'

const Endow = () => {
  const items = useSelector((state: RootState) => state.productList.items)
  const endowItems = items?.filter(item => item.volumes[0].discount > 0)
  return (
    <>
      <Section title="Sản phẩm ưu đãi">
        <ShowMore />
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
              endowItems?.map(item => (
                <SwiperSlide><ProductCard key={item._id} product={item} /></SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </Section>
    </>
  )
}

export default Endow