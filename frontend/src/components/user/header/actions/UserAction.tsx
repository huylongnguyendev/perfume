import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { Link } from 'react-router-dom'

const UserAction = () => {

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer rounded-full"
      >
        <Link to="/signin" className="inline-flex size-full items-center justify-center">
          <User />
        </Link>
      </Button>
    </>
  )
}

export default UserAction