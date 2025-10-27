import { HomeIcon } from 'lucide-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'
import { Link } from 'react-router-dom'

const BreadCrumbPage = () => {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbList className='h-8 gap-2 rounded-md border px-3 text-sm mb-4'>
                    <BreadcrumbItem>
                        <Link to='/'>
                            <HomeIcon className='size-4' />
                            <span className='sr-only'>Trang chủ</span>
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Link to='/products'>Sản phẩm</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Chi tiết</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </>
    )
}

export default BreadCrumbPage