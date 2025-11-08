import img01 from '@/assets/perfume-introduce-1.jpeg'
import img02 from '@/assets/introduce-02.webp'
import { Collapsible } from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronsUpDown } from 'lucide-react'

const IntroducePage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const items = [
        {
            value: "1",
            label: "Có chính sách đổi trả hàng không?",
            description: "Chúng tôi cam kết đem đến sự hài lòng tối đa cho khách hàng. Nếu bạn không hài lòng với sản phẩm đã mua, chúng tôi sẽ xem xét các yêu cầu đổi hoặc trả hàng trong vòng 30 ngày kể từ khi mua hàng. Vui lòng tham khảo chính sách đổi trả hàng của chúng tôi để biết thêm chi tiết."
        },
        {
            value: "2",
            label: "Làm thế nào tôi có thể tìm được mùi hương phù hợp?",
            description: "Chúng tôi hiểu rằng việc chọn lựa một mùi hương phù hợp có thể là một thử thách. Đội ngũ chuyên gia của chúng tôi sẵn lòng tư vấn và hỗ trợ bạn trong quá trình này. Bạn có thể xem danh sách các mùi hương phổ biến trên trang web của chúng tôi hoặc liên hệ với chúng tôi để được tư vấn trực tiếp."
        },
        {
            value: "3",
            label: "Sản phẩm có thành phần gây dị ứng không?",
            description: "Chúng tôi cam kết chỉ cung cấp những sản phẩm chính hãng và đáng tin cậy. Tuy nhiên, trong trường hợp bạn có dị ứng với một thành phần cụ thể, vui lòng kiểm tra thành phần trước khi mua hàng. Nếu bạn cần thông tin cụ thể về thành phần của một sản phẩm, chúng tôi sẽ sẵn lòng cung cấp cho bạn."
        },
    ]

    return (
        <>
            <div className="mt-28 px-4 md:px-12 lg:px-16">
                <h2 className="text-2xl font-semibold capitalize text-center mb-6">Giới thiệu</h2>
                <div className="md:flex gap-5 space-y-5 mb-12">
                    <div className="space-y-5 md:w-1/2">
                        <h3 className="text-lg font-semibold">
                            Hương thơm tuyệt vời
                        </h3>
                        <p className="text-muted-foreground">
                            Chào mừng bạn đến với trang web của chúng tôi, nơi bạn có thể khám phá và tìm thấy những mùi hương tuyệt vời từ thế giới nước hoa. Chúng tôi tự hào là một địa chỉ đáng tin cậy cho những người yêu nước hoa, với một bộ sưu tập đa dạng và phong phú, hướng đến sự hài lòng tối đa của khách hàng.
                        </p>
                        <p className="text-muted-foreground">
                            Chúng tôi hiểu rằng nước hoa không chỉ là một sản phẩm mà còn là một trải nghiệm, một cách để thể hiện cá nhân và tăng cường sự tự tin của bạn. Vì vậy, chúng tôi đã tỉ mỉ lựa chọn những thương hiệu nước hoa hàng đầu từ khắp nơi trên thế giới, để mang đến cho bạn những lựa chọn tuyệt vời nhất.
                        </p>
                    </div>
                    <div className="md:w-1/2 shrink-0">
                        <img src={img01} alt="introduce-01" className="size-full object-cover" />
                    </div>
                </div>
                <div className="flex max-md:flex-col-reverse gap-5 ">
                    <img src={img02} alt="introduce-02" className="object-cover"/>
                    <div className="w-full space-y-3">
                        <h4 className="text-2xl font-semibold max-md:text-center mb-6">Các câu hỏi thường gặp</h4>
                        {
                            items.map(item => (
                                <Collapsible
                                    key={`${item.value}-introdsc`}
                                    open={isOpen}
                                    onOpenChange={setIsOpen}
                                    className="flex flex-col gap-2 rounded-md border py-1"
                                >
                                    <div className="px-3 font-semibold">
                                        <CollapsibleTrigger asChild>
                                            <p className="flex justify-between bg-transparent! cursor-pointer items-center ">
                                                <span>{item.label}</span>
                                                <ChevronsUpDown className="size-4"/>
                                            </p>
                                        </CollapsibleTrigger>
                                    </div>
                                    <CollapsibleContent className="px-3">{item.description}</CollapsibleContent>
                                </Collapsible>
                            ))
                        }
                    </div>
                </div>
            </div >
        </>
    )
}

export default IntroducePage