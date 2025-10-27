import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import { useState } from 'react'


const FooterForm = () => {
    const [inputEmail, setInputEmail] = useState<string>("")

    return (
        <>
            <form className="relative mt-3">
                <Input
                    value={inputEmail}
                    type="email"
                    onChange={(e) => setInputEmail(e.target.value)}
                    placeholder="Nhập email của bạn..." 
                    className="py-5 pe-11"    
                />
                <Button
                    type="submit"
                    variant="default"
                    size="icon"
                    className="cursor-pointer absolute right-1 top-1/2 -translate-y-1/2"
                >
                    <Send />
                </Button>
            </form>
        </>
    )
}

export default FooterForm