import { cn } from "@/lib/utils"
import { useState } from "react"

interface Props {
  image: Array<string>
  name: string
}

const ImgDetail = ({ image, name }: Props) => {
  const [selected, setSelected] = useState<number>(0)


  return (
    <>
      <div className="md:w-1/2">
        <img src={image[selected]} alt={`${name}-${image[selected]}`} className="w-96 mx-auto" />
        <div className="h-24 flex p-1 gap-2 bg-muted/10 rounded-md shadow-md">
          {
            image.map((i, index) => (
              <div className={cn("border", selected === index && "border-primary")}
                key={i}
                onClick={() => setSelected(index)}>
                <img src={i} alt={`${name}-${i}`} className="size-24 h-full object-cover rounded-sm outline-2" />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default ImgDetail