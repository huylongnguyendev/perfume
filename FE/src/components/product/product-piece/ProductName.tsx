
interface Props {
    brand: string
    name: string
}

const ProductName = ({ brand, name }: Props) => {
    return (
        <>
            <div className="text-center font-semibold uppercase">
                <p className="text-sm text-muted-foreground">{brand}</p>
                <h3 className="text-lg text-card-foreground line-clamp-1 transition-all duration-300 hover:text-card-accent">{name}</h3>
            </div>
        </>
    )
}

export default ProductName