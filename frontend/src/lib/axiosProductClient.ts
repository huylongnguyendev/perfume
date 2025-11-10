import axios from 'axios'
import BASE_URL from './BASEURL'

const axiosProductClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
})

axiosProductClient.interceptors.response.use(
  res => res,
  err => {
    return Promise.reject(err)
  }
)

export default axiosProductClient