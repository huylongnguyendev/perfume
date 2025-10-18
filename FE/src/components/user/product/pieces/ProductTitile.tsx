import { cn } from "@/lib/utils"

interface Props {
    variant?: "card" | "cart" | "item"
    name: string
    brand?: string
}
export const ProductTitile: React.FC<Props> = ({ variant, name, brand }) => {
    return (
        <>
            <div className="font-semibold text-muted-foreground space-y-1">
                {variant === "card" && <p className="text-center text-xs uppercase text-muted-foreground">{brand}</p>}
                <h3 className={cn("uppercase text-card-foreground line-clamp-1", variant === "card" && "text-center")}>{name}</h3>
            </div>
        </>
    )
}
