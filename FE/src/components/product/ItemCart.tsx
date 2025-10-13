import prd from '@assets/prd_14.png'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'
import { Input } from '../ui/input'

const ItemCart = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [cartNumber, setCartNumber] = useState<number>(1)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setCartNumber(cartNumber)
      setIsEdit(!isEdit)
    }
  }

  return (
    <>
      <li className="outline rounded-lg">
        <div className="flex gap-1">
          <img src={prd} alt="prdname" className="w-28" />
          <div className="w-full flex flex-col p-4">
            <div className="flex">
              <div className="w-full">
                <h3 className="text-lg font-semibold">product name</h3>
                <p className="text-muted-foreground">size: 100ml</p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                className="cursor-pointer"
              >
                <Trash2 />
              </Button>
            </div>
            <div className="flex max-md:flex-col justify-between items-center mt-auto">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon-sm" className="cursor-pointer">-</Button>
                <p className="p-1 cursor-pointer"
                  onDoubleClick={() => setIsEdit(!isEdit)}
                  onTouchEnd={() => setIsEdit(!isEdit)}
                  onBlur={() => setIsEdit(false)}
                >
                  {
                    isEdit &&
                    <Input
                      type="number"
                      value={cartNumber}
                      onChange={(e) => setCartNumber(parseInt(e.target.value))}
                      onKeyDown={handleKeyDown}
                      className="p-1!" /> || <p>{cartNumber}</p>
                  }
                </p>
                <Button variant="outline" size="icon-sm" className="cursor-pointer">+</Button>
              </div>
              <p className="font-semibold text-lg w-full text-right">10,000,000</p>
            </div>
          </div>
        </div>
      </li>
    </>
  )
}

export default ItemCart