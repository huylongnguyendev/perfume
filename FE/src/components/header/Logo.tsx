import logo from '@assets/logo.png'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <>
            <div className='w-32 md:w-36'>
                <Link to="/" className='size-full'>
                    <img src={logo} alt="logo" className='w-full object-center'/>
                </Link>
            </div>
        </>
    )
}

export default Logo