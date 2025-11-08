import { axiosAuthClient, axiosRefreshClient } from '@/lib/axiosAuthClient'
import type { UserSignIn, UserSignUp } from '@/lib/types'

export const authApi = {
    signIn: (data: UserSignIn) => axiosAuthClient.post("/auth/signin", data, { withCredentials: true }),
    signUp: (data: UserSignUp) => axiosAuthClient.post("/auth/signup", data),
    signOut: () => axiosAuthClient.post("/auth/signout", {}, { withCredentials: true }),
    refreshToken: () => axiosRefreshClient.post("/auth/refresh", {}, { withCredentials: true }),
    getProfile: () => axiosAuthClient.get("/auth/user/profile")
}