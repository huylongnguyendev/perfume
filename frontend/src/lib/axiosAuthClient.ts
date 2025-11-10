import axios from 'axios'
import Cookies from 'js-cookie'
import BASE_URL from './BASEURL'

const axiosAuthClient = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
})

const axiosRefreshClient = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
})

// Gắn accessToken vào header mỗi lần gửi request
axiosAuthClient.interceptors.request.use(config => {
    const accessToken = Cookies.get("accessToken")
    if (accessToken && !config.url?.includes('/auth/refresh')) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

// Quản lý trạng thái refresh token
let isRefreshing = false
let failedQueue: {
    resolve: (value?: any) => void,
    reject: (error: any) => void
}[] = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })
    failedQueue = []
}

// Tự động refresh nếu accessToken hết hạn
axiosAuthClient.interceptors.response.use(
    res => res,
    async err => {
        const originalRequest = err.config
        const currentAccessToken = Cookies.get("accessToken")

        if (!currentAccessToken) {
            return Promise.reject(err)
        }

        if (
            err.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/auth/refresh")
        ) {
            originalRequest._retry = true

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    return axiosAuthClient(originalRequest)
                }).catch(error => Promise.reject(error))
            }

            isRefreshing = true

            try {
                const refreshRes = await axiosRefreshClient.post('/auth/refresh')
                const newAccessToken = refreshRes.data.accessToken

                if (newAccessToken) {
                    Cookies.set('accessToken', newAccessToken, { expires: 1 })
                    processQueue(null, newAccessToken)
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return axiosAuthClient(originalRequest)
                }
            } catch (refreshError) {
                processQueue(refreshError, null)
                Cookies.remove('accessToken')
                if (window.location.pathname !== "/shop") {
                    window.location.href = "/shop"
                }
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(err)
    }
)

export { axiosAuthClient, axiosRefreshClient }