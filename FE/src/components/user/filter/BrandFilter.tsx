import TitleFilter from './TitleFilter'

const BrandFilter = () => {
    return (
        <>
            <div>
                <TitleFilter title="Thương hiệu" />
                <ul className="w-full rounded-lg overflow-y-scroll h-40 border bg-background font-semibold p-1">
                    <li className="px-4 py-1 rounded-md transition-colors hover:text-primary hover:bg-muted cursor-pointer">Dior</li>
                    <li className="px-4 py-1 rounded-md transition-colors hover:text-primary hover:bg-muted cursor-pointer">Dior</li>
                    <li className="px-4 py-1 rounded-md transition-colors hover:text-primary hover:bg-muted cursor-pointer">Dior</li>
                    <li className="px-4 py-1 rounded-md transition-colors hover:text-primary hover:bg-muted cursor-pointer">Dior</li>
                    <li className="px-4 py-1 rounded-md transition-colors hover:text-primary hover:bg-muted cursor-pointer">Dior</li>
                    <li className="px-4 py-1 rounded-md transition-colors hover:text-primary hover:bg-muted cursor-pointer">Dior</li>
                    <li className="px-4 py-1 rounded-md transition-colors hover:text-primary hover:bg-muted cursor-pointer">Dior</li>

                </ul>
            </div>
        </>
    )
}

export default BrandFilter