import { Button } from './ui/button'
import { User } from 'lucide-react'

const UserAction = () => {
    return (
        <>
            <Button
                variant="outline"
                size="icon"
                className="cursor-pointer rounded-full"
            >
                <User />
            </Button>
        </>
    )
}

export default UserAction