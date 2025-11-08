import axios from 'axios'

const axiosImage = axios.create({
  baseURL: import.meta.env.VITE_REACT_PRODUCT_API, // 👈 dùng biến môi trường nếu cần
  withCredentials: true, // 👈 nếu dùng cookie để xác thực
  headers: {
    "Content-Type": "application/json"
  }
})

export default axiosImage
