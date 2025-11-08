import { Button } from "@/components/ui/button"
import { Plus, RotateCcw } from "lucide-react"


const ManageHead = () => {
    return (
        <>
            <div className="flex justify-between items-center w-full ">
                <h2 className="font-semibold">Quản lý sản phẩm</h2>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        className="cursor-pointer">
                        <RotateCcw />
                        <span>Tải lại trang</span>
                    </Button>
                    <Button className="cursor-pointer">
                        <Plus />
                        <span>Thêm sản phẩm</span>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ManageHead