import { Link } from "react-router-dom"
import { Button } from "../ui/button"

const Auth = () => {
    return (
        <>
            <div className="w-full flex flex-col gap-1 mt-auto lg:hidden">
                <Button
                    className="cursor-pointer"
                >
                    <Link to="/">Đăng ký</Link>
                </Button>
                <Button
                    variant="secondary"
                    className="cursor-pointer"
                >
                    <Link to="/">Đăng nhập</Link>
                </Button>
            </div>
        </>
    )
}

export default Auth