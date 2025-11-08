import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUp } from '@/redux/authSlice'
import type { AppDispatch, RootState } from '@/redux/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound, Mail, MapPin, Phone, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import z from 'zod'

const SignUpSchema = z.object({
    username: z.string().trim().min(3, "Username phải có ít nhất 3 ký tự!"),
    fullName: z.string().trim().min(3, "Họ tên phải có ít nhất 3 ký tự!"),
    password: z.string().trim().min(8, "Password phải có ít nhất 8 ký tự!"),
    phoneNumber: z.string().trim().regex(/^0\d{9}$/, "Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số!"),
    email: z.string().trim().email("Email không hợp lệ!").optional(),
    address: z.string().trim().min(3, "Địa chỉ phải có ít nhất 3 ký tự!"),
})

type SignUpFormType = z.infer<typeof SignUpSchema>

const SignUpPage = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormType>({ resolver: zodResolver(SignUpSchema) })
    const loading = useSelector((state: RootState) => state.auth.loading)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()


    const onSubmit = async (data: SignUpFormType) => {
        try {
            await dispatch(signUp(data)).unwrap()
            toast.success("Đăng ký thành công")
            navigate("/signin")
        } catch (error: any) {
            toast.error(error)
        }
    }
    return (
        <>
            <div
                className="w-full h-dvh grid place-items-center background-gradient">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="shadow-md p-4 rounded-lg text-center space-y-5 bg-background">
                    <div className="space-y-1.5">
                        <Logo />
                        <p className="text-balance text-muted-foreground">Chào mừng bạn! Đăng ký để nhận nhiều ưu đãi hấp dẫn!</p>
                    </div>
                    <div className="space-y-1.5 text-left">
                        <Label htmlFor="username" className="text-muted-foreground">Username</Label>
                        <div className="relative">
                            <User className="absolute top-1/2 left-1 -translate-y-1/2 size-5 text-muted-foreground" />
                            <Input id="username" type="text" className="ps-7" {...register("username")} />
                        </div>
                        {
                            errors.username && (
                                <p className="text-destructive text-left text-sm">{errors.username.message}</p>
                            )
                        }
                    </div>
                    <div className="space-y-1.5 text-left">
                        <Label htmlFor="fullName" className="text-muted-foreground">Họ tên</Label>
                        <div className="relative">
                            <User className="absolute top-1/2 left-1 -translate-y-1/2 size-5 text-muted-foreground" />
                            <Input id="fullName" type="text" className="ps-7" {...register("fullName")} />
                        </div>
                        {
                            errors.fullName && (
                                <p className="text-destructive text-left text-sm">{errors.fullName.message}</p>
                            )
                        }
                    </div>
                    <div className="space-y-1.5 text-left">
                        <Label htmlFor="phoneNumber" className="text-muted-foreground">Số điện thoại</Label>
                        <div className="relative">
                            <Phone className="absolute top-1/2 left-1 -translate-y-1/2 size-5 text-muted-foreground" />
                            <Input id="phoneNumber" type="text" className="ps-7" {...register("phoneNumber")} />
                        </div>
                        {
                            errors.phoneNumber && (
                                <p className="text-destructive text-left text-sm">{errors.phoneNumber.message}</p>
                            )
                        }
                    </div>
                    <div className="space-y-1.5 text-left">
                        <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                        <div className="relative">
                            <Mail className="absolute top-1/2 left-1 -translate-y-1/2 size-5 text-muted-foreground" />
                            <Input id="email" type="text" className="ps-7" {...register("email")} />
                        </div>
                        {
                            errors.email && (
                                <p className="text-destructive text-left text-sm">{errors.email.message}</p>
                            )
                        }
                    </div>
                    <div className="space-y-1.5 text-left">
                        <Label htmlFor="address" className="text-muted-foreground">Địa chỉ</Label>
                        <div className="relative">
                            <MapPin className="absolute top-1/2 left-1 -translate-y-1/2 size-5 text-muted-foreground" />
                            <Input id="address" type="text" className="ps-7" {...register("address")} />
                        </div>
                        {
                            errors.address && (
                                <p className="text-destructive text-left text-sm">{errors.address.message}</p>
                            )
                        }
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="username" className="text-muted-foreground">Mật khẩu</Label>
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
                    >{ loading === "loading" && "Đang xử lý..." || "Đăng ký"}</Button>

                    <p className="text-sm text-muted-foreground">
                        Đã có tài khoản? <Link className="text-blue-400 border-b border-transparent transition-colors duration-300 hover:border-b-blue-400" to="/signin">Đăng nhập</Link> tại đây!
                    </p>
                </form>
            </div>
        </>
    )
}

export default SignUpPage