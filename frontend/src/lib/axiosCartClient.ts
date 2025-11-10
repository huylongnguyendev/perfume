import axios from 'axios'
import Cookies from 'js-cookie'
import { axiosRefreshClient } from '@/lib/axiosAuthClient'
import BASE_URL from './BASEURL'

const axiosCartClient = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
})

axiosCartClient.interceptors.request.use(config => {
    const accessToken = Cookies.get("accessToken")
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

axiosCartClient.interceptors.response.use(
    res => res,
    async err => {
        const originalRequest = err.config
        if (
            err.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/auth/refresh")
        ) {
            originalRequest._retry = true
            try {
                const refreshRes = await axiosRefreshClient.post("/auth/refresh")
                const newAccessToken = refreshRes.data.accessToken
                if (newAccessToken) {
                    Cookies.set("accessToken", newAccessToken, { expires: 1 })
                    originalRequest.headers = originalRequest.headers || {}
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return axiosCartClient(originalRequest)
                }
            } catch (refreshError) {
                Cookies.remove("accessToken")
                window.location.href = "/signin"
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(err)
    }
)

export default axiosCartClient