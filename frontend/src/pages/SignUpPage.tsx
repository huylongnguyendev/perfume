import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const signUpSchema = z.object({
    firstname: z.string().min(1, "Tên bắt buộc phải có"),
    lastname: z.string().min(1, "Họ bắt buộc phải có"),
    username: z.string().min(3, "Username bắt buộc phải có và có ít nhất 3 kí tự"),
    email: z.email("Email không hợp lệ") || z.null,
    phone: z.string().min(10, "Số điện thoại có ít nhất 10 chữ số").max(10, "Số điện thoại có tối đa 10 chữ số"),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 kí tự")
})

type SignUpValueType = z.infer<typeof signUpSchema>

const SignUpPage = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpValueType>({ resolver: zodResolver(signUpSchema) })

    const onSubmit = async (data: SignUpValueType) => {

    }

    return (
        <>
            <div className="h-dvh w-full bg-primary/20 grid place-items-center px-4">
                <form className="bg-background rounded-lg p-4 shadow-md" onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-center space-y-1.5">
                        <Logo />
                        <p className="text-muted-foreground text-balance font-semibold">Chào mừng bạn! Hãy đăng kí để nhận nhiều ưu đãi!</p>
                    </div>
                    <div className="space-y-4 mt-4 w-full">
                        <div className="space-y-1 flex gap-5">
                            <div className="space-y-2 w-1/2">
                                <Label htmlFor="lastname" className="text-muted-foreground cursor-pointer">Họ</Label>
                                <Input
                                    type="text"
                                    id="lastname"
                                    {...register("lastname")}
                                />
                                {
                                    errors.lastname && (<p className="text-sm text-destructive">
                                        {errors.lastname.message}
                                    </p>)
                                }

                            </div>
                            <div className="space-y-2 w-1/2">
                                <Label htmlFor="firstname" className="text-muted-foreground cursor-pointer">Tên</Label>
                                <Input type="text"
                                    id="firstname"
                                    {...register("firstname")} />
                                {
                                    errors.firstname && (<p className="text-sm text-destructive">
                                        {errors.firstname.message}
                                    </p>)
                                }
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-muted-foreground cursor-pointer">Username</Label>
                            <Input
                                type="text"
                                id="username"
                                {...register("username")}
                            />
                            {
                                errors.username && (<p className="text-sm text-destructive">
                                    {errors.username.message}
                                </p>)
                            }
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-muted-foreground cursor-pointer">Số điện thoại</Label>
                            <Input
                                type="text"
                                id="phone"
                                {...register("phone")}
                            />
                            {
                                errors.phone && (<p className="text-sm text-destructive">
                                    {errors.phone.message}
                                </p>)
                            }
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-muted-foreground cursor-pointer">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                {...register("email")}
                            />
                            {
                                errors.email && (<p className="text-sm text-destructive">
                                    {errors.email.message}
                                </p>)
                            }
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-muted-foreground cursor-pointer">Mật khẩu</Label>
                            <Input
                                type="password"
                                id="password"
                                {...register("password")}
                            />
                            {
                                    errors.password && (<p className="text-sm text-destructive">
                                    {errors.password.message}
                                </p>)
                                }
                        </div>

                        <Button type="submit"
                            className="w-full cursor-pointer"
                            disabled={isSubmitting}
                        >Tạo tài khoản</Button>
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-sm text-muted-foreground text-balance">Bạn đã có tài khoản? Quay lại <Link to="/signin" className="text-sky-500">Đăng nhập</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUpPage