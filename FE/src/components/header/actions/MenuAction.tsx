import { Button } from '@/components/ui/button'
import type { AppDispatch } from '@/redux/store'
import { switchMenu } from '@/redux/toggleSlice'
import { Menu } from 'lucide-react'
import { useDispatch } from 'react-redux'

const MenuAction = () => {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <>
            <Button
                variant="secondary"
                size="icon"
                onClick={()=>dispatch(switchMenu())}
                className="cursor-pointer rounded-full md:hidden"
            >
                <Menu />
            </Button>
        </>
    )
}

export default MenuAction