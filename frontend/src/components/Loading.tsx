import { Spinner } from './ui/spinner'

const Loading = () => {
    return (
        <>
            <div className="flex gap-1 justify-center items-center">
                <Spinner/>
                <p>Sắp kiếm xong rồi...! Đợi xíu bạn nhé!
                </p>
            </div>
        </>
    )
}

export default Loading