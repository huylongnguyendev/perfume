import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'

const UserAction = () => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer rounded-full"
      >
        <User />
      </Button>
    </>
  )
}

export default UserAction