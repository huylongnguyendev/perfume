import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { KeyRound, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { signIn } from '@/redux/authSlice'
import { useEffect } from 'react'

const SignInSchema = z.object({
    userSignin: z.string().min(3, "Vui lòng nhập Username hoặc Số điện thoại"),
    password: z.string().min(8, "Mật khẩu có ít nhất 8 kí tự")
})
type SignInFormType = z.infer<typeof SignInSchema>

const SignInPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { isSignIn, user } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormType>({ resolver: zodResolver(SignInSchema) })

    const onSubmit = async (data: SignInFormType) => {
        await dispatch(signIn(data))
    }

    useEffect(() => {
        if (isSignIn && user)
            navigate("/shop")
    }, [isSignIn])

    return (
        <>
            <div
                className="w-full h-dvh grid place-items-center background-gradient">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="shadow-md p-4 rounded-lg text-center space-y-5 bg-background">
                    <div className="space-y-1.5">
                        <Logo />
                        <p className="text-balance text-muted-foreground">Chào mừng bạn! Đăng nhập vào tài khoản của bạn!</p>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-muted-foreground">Username hoặc Số điện thoại</Label>
                        <div className="relative">
                            <User className="absolute top-1/2 left-1 -translate-y-1/2 size-5 text-muted-foreground" />
                            <Input type="text" className="ps-7" {...register("userSignin")} />
                        </div>
                        {
                            errors.userSignin && (
                                <p className="text-destructive text-left text-sm">{errors.userSignin.message}</p>
                            )
                        }
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-muted-foreground">Mật khẩu</Label>
                        <div className="relative">
                            <KeyRound className="absolute top-1/2 left-1 -translate-y-1/2 size-5 text-muted-foreground" />
                            <Input type="password" className="ps-7" {...register("password")} />
                        </div>
                        {
                            errors.password && (
                                <p className="text-destructive text-left text-sm">{errors.password.message}</p>
                            )
                        }
                    </div>
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full cursor-pointer"
                    >Đăng nhập</Button>

                    <p className="text-sm text-muted-foreground">
                        Chưa có tài khoản? <Link className="text-blue-400 border-b border-transparent transition-colors duration-300 hover:border-b-blue-400" to="/signup">Đăng ký</Link> tại đây!
                    </p>
                </form>
            </div>
        </>
    )
}

export default SignInPage