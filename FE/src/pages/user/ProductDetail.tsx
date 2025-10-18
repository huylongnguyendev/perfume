import prd from '@/assets/prd_3.png'
import { Button } from '@/components/ui/button'
import BreadCrumbPage from '@/components/user/BreadCrumbPage'
import TabDetails from '@/components/user/product/TabDetails'
import Relative from '@/components/user/section/Relative'
import { HeartPlus, ShoppingCart, Star } from 'lucide-react'

const ProductDetail = () => {
    return (
        <>
            <div className="py-4 px-4 md:px-12 lg:px-16 mt-[88px]">
                <BreadCrumbPage />
                <div className="md:flex">
                    <div className="flex max-md:flex-col-reverse md:w-1/2">
                        <div className="max-md:w-full max-md:flex max-md:h-24 bg-secondary gap-1 w-40 p-1 space-y-1 rounded-lg">
                            <img src={prd} alt="" className="max-md:w-24 object-cover w-full rounded-lg outline" />
                            <img src={prd} alt="" className="max-md:w-24 object-cover w-full rounded-lg outline" />
                        </div>
                        <div className="w-full">
                            <img src={prd} alt="" className="object-cover" />
                        </div>
                    </div>
                    <div className="md:w-1/2 space-y-1">
                        <h2 className="text-2xl font-semibold capitalize">Product Name</h2>
                        <div className="flex gap-1 items-center">
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                            <span>(100)</span>
                        </div>
                        <div>
                            <div className="space-x-1">
                                <span className="line-through text-muted-foreground">15,000,000</span>
                                <span className="text-xl font-semibold">12,000,000</span>
                            </div>
                            <p className="text-muted-foreground my-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, maiores, sint quasi adipisci voluptatem illo, voluptates similique debitis dicta quia non? Facilis, perferendis dignissimos earum amet eius libero sit exercitationem!</p>
                        </div>
                        <div className="space-x-1">
                            <Button variant="outline" className="cursor-pointer" >10ml</Button>
                            <Button variant="outline" className="cursor-pointer" >10ml</Button>
                            <Button variant="outline" className="cursor-pointer" >10ml</Button>
                        </div>
                        <div className="my-4 space-x-1">
                            <Button className="cursor-pointer">
                                <ShoppingCart />
                                <span>Thêm vào giỏ hàng</span>
                            </Button>
                            <Button variant="secondary" size="icon" className="cursor-pointer">
                                <HeartPlus />
                            </Button>
                        </div>
                    </div>
                </div>
                <TabDetails />
                <Relative />
            </div>
        </>
    )
}

export default ProductDetail