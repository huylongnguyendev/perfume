import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <>
            <div className="text-3xl font-semibold">
                <Link to="/">
                    <span>Per</span><span className="text-primary">fumei</span>
                </Link>
            </div>
        </>
    )
}

export default Logo