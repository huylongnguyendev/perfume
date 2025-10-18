interface Props {
    variant?: "card" | "cart" | "item"
    price: number
    desc?: string
    customeStyle?: string
}
const ProductContent: React.FC<Props> = ({ variant, price, desc, customeStyle }) => {
    return (
        <>
            <div className={`text-right ${customeStyle}`}>
                <p className="text-xs line-through">{price.toLocaleString()}</p>
                <p className="text-lg">{price.toLocaleString()}</p>
            </div>
            {
                variant === "item" && <p className="text-muted-foreground line-clamp-2 text-sm">{desc}</p>
            }
        </>
    )
}

export default ProductContent