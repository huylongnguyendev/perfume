import { Button } from '../ui/button'

export const FilterRadio = () => {
    return (
        <>
            <div className="flex md:justify-center items-center gap-1 max-md:overflow-x-scroll mb-4">
                <Button variant="outline" className="cursor-pointer">Mới nhất</Button>
                <Button variant="outline" className="cursor-pointer">Khuyến mãi</Button>
                <Button variant="outline" className="cursor-pointer">Nam</Button>
                <Button variant="outline" className="cursor-pointer">Nữ</Button>
                <Button variant="outline" className="cursor-pointer">Unisex</Button>
            </div>
        </>
    )
}
