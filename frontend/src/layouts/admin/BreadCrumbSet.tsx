import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { setCrumbs, setResetBreadCrumb } from '@/redux/breadCrumbSlice'
import type { AppDispatch, RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { ChartArea, ChevronsRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const BreadCrumbSet = () => {
    const crumbs = useSelector((state: RootState) => state.breadCrumb.crumbs)
    const dispatch = useDispatch<AppDispatch>()

    const handleClickCrumb = (index: number) => {
        const newBreadCrumb = crumbs.slice(0, index + 1)
        dispatch(setCrumbs(newBreadCrumb))
    }

    return (
        <>
            {
                crumbs.length > 0 && (
                    <Breadcrumb className="border p-1 rounded-sm">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to="/admin"
                                        onClick={() => dispatch(setResetBreadCrumb())}
                                    >
                                        <ChartArea className="size-5" />
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator>
                                <ChevronsRight />
                            </BreadcrumbSeparator>
                            {
                                crumbs.map((crumb, index) => (
                                    <div key={crumb.value}>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <Link to={crumb.url}
                                                    onClick={() => handleClickCrumb(index)}
                                                    className="inline-flex items-center justify-center gap-2">
                                                    {crumb.name}
                                                </Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        {index !== crumbs.length - 1 && (
                                            <BreadcrumbSeparator>
                                                <ChevronsRight />
                                            </BreadcrumbSeparator>
                                        )}
                                    </div>
                                ))
                            }
                        </BreadcrumbList>
                    </Breadcrumb>
                )
            }
        </>
    )
}

export default BreadCrumbSet