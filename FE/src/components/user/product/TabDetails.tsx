import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tabs = [
    {
        name: 'Hương',
        value: 'smell',
        content: (
            <>
                Discover <span className='text-foreground font-semibold'>fresh ideas</span>, trending topics, and hidden gems
                curated just for you. Start exploring and let your curiosity lead the way!
            </>
        )
    },
    {
        name: 'Chi tiết',
        value: 'detail',
        content: (
            <>
                All your <span className='text-foreground font-semibold'>favorites</span> are saved here. Revisit articles,
                collections, and moments you love, any time you want a little inspiration.
            </>
        )
    },
]

const TabDetails = () => {
    return (
        <>
            <div className='w-full bg-secondary p-4 rounded-xl mt-4'>
                <Tabs defaultValue='explore' className='gap-4'>
                    <TabsList className='bg-background gap-1 border p-1'>
                        {tabs.map(tab => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className='data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:border-transparent'
                            >
                                {tab.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {tabs.map(tab => (
                        <TabsContent key={tab.value} value={tab.value}>
                            <p className='text-muted-foreground text-sm'>{tab.content}</p>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </>
    )
}

export default TabDetails