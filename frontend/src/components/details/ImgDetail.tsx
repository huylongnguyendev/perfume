import prd from '@/assets/prd_3.png'

const ImgDetail = () => {
    return (
        <>
            <div className="md:w-1/2">
                <img src={prd} alt="" className="w-96 mx-auto" />
                <div className="h-24 flex p-1 gap-1 bg-muted/50 rounded-md shadow-md">
                    <img src={prd} alt="" className="size-24 h-full object-cover rounded-sm outline-2" />
                    <img src={prd} alt="" className="size-24 h-full object-cover rounded-sm" />
                </div>
            </div>
        </>
    )
}

export default ImgDetail