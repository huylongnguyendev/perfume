import { Button } from '@/components/ui/button'
import type { AppDispatch } from '@/redux/store'
import { setIsOpenMenu } from '@/redux/toggleSlice'
import { Menu } from 'lucide-react'
import { useDispatch } from 'react-redux'

const MenuAction = () => {
    const dispatch = useDispatch<AppDispatch>()

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={()=>dispatch(setIsOpenMenu())}
                className="cursor-pointer rounded-full"
            >
                <Menu />
            </Button>
        </>
    )
}

export default MenuAction