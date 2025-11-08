import type { ProductType } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

interface Props {
    item: ProductType
}

const DescDetail = ({ item }: Props) => {
    const tabs = [
        {
            name: "Hương",
            value: "smell",
            content: (
                <>
                    {
                        <>
                            <div className="flex justify-between items-center space-y-1">
                                <p className="font-semibold">Hương đầu</p>
                                <p className="inline-flex items-center gap-2">
                                    {item.scents.top.map((scent, index) => (
                                        <p key={scent + index}>{scent}</p>
                                    ))}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">Hương giữa</p>
                                <p className="inline-flex items-center gap-2">
                                    {item.scents.middle.map((scent, index) => (
                                        <p key={scent + index}>{scent}</p>
                                    ))}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">Hương cuối</p>
                                <p className="inline-flex items-center gap-2">
                                    {item.scents.base.map((scent, index) => (
                                        <p key={scent + index}>{scent}</p>
                                    ))}
                                </p>
                            </div>
                        </>
                    }
                </>
            )
        },
        {
            name: "Chi tiết",
            value: "details",
            content: (
                <>
                    {item.description}
                </>
            )
        },
    ]

    return (
        <>
            <div className='w-full md:max-w-md mt-5'>
                <Tabs defaultValue="details">
                    <TabsList className="gap-1">
                        {
                            tabs.map(tab => (
                                <TabsTrigger key={tab.value} value={tab.value} className="cursor-pointer">{tab.name}</TabsTrigger>
                            ))
                        }

                    </TabsList>
                    {
                        tabs.map(tab => (
                            <TabsContent className="bg-secondary p-2 rounded-lg" key={tab.value} value={tab.value}>
                                {
                                    tab.value === "smell" && (
                                        <div className="">
                                            {tab.content}
                                        </div>
                                    ) || (<p className="text-secondary-foreground">{tab.content}</p>)
                                }
                            </TabsContent>
                        ))
                    }
                </Tabs>
            </div>
        </>
    )
}

export default DescDetail