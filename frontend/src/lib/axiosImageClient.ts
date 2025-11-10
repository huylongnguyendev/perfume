import axios from 'axios'
import BASE_URL from './BASEURL'

const axiosImage = axios.create({
  baseURL: BASE_URL, // 👈 dùng biến môi trường nếu cần
  withCredentials: true, // 👈 nếu dùng cookie để xác thực
  headers: {
    "Content-Type": "application/json"
  }
})

export default axiosImage
