import Section from '@/layouts/user/Section'
import { motion } from 'framer-motion'
import GenderItem from './GenderItem'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { setFilters } from '@/redux/productFilterSlice'
import { useNavigate } from 'react-router-dom'

const genders = [
  {
    name: "Nam",
    value: "Nam",
    desc: "Tìm kiếm mùi hương nam tính, phong cách lịch lãm, sang trọng chuẩn quý ông hoặc phong cách mạnh mẽ, trẻ trung"
  },
  {
    name: "Nữ",
    value: "Nữ",
    desc: "Tìm kiếm mùi hương nhẹ nhàng, quyến rũ đầy ngọt ngào hơi hướng quý phái hoặc đầy nữ tính"
  },
  {
    name: "Unisex",
    value: "Unisex",
    desc: "Sự lựa chọn hoàn hảo cho mùi hương tinh tế dành cho cả nam và nữ"
  },
]

const Gender = () => {
  const filters = useSelector((state: RootState) => state.productFilter)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleNavigate = (value: string) => {
    dispatch(setFilters({ ...filters, gender: value }))
    navigate("/shop/products")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }


  return (
    <>
      <Section title="Chọn theo giới tính">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {
            genders.map((gender, index) => (
              <motion.div
                key={gender.value}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleNavigate(gender.value)}
                className="cursor-pointer shadow-md shadow-indigo-200 rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg flex justify-center items-center group"
              >
                <GenderItem gender={gender} />
              </motion.div>
            ))
          }
        </div>
      </Section>
    </>
  )
}

export default Gender