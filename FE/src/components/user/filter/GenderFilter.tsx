import { Button } from '@/components/ui/button'
import TitleFilter from './TitleFilter'

const GenderFilter = () => {
    return (
        <>
            <div>
                <TitleFilter title="Giới tính" />
                <div className="space-x-1">
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                    >Nam</Button>
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                    >Nữ</Button>
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                    >Unisex</Button>
                </div>
            </div>
        </>
    )
}

export default GenderFilter