import axios from 'axios'

const REACT_PRODUCT_API = import.meta.env.VITE_REACT_PRODUCT_API

const axiosProductClient = axios.create({
    baseURL: REACT_PRODUCT_API,
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