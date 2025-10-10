import { Button } from '@/components/ui/button'
import { UserCircle } from 'lucide-react'

const UserAction = () => {
    return (
        <>
            <Button
                variant="outline"
                size="icon"
                className="cursor-pointer rounded-full"
            >
                <UserCircle />
            </Button>
        </>
    )
}

export default UserAction