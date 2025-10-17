import { linkList, listIconLink } from '@/lib/data'
import Logo from '../Logo'
import FooterHead from './FooterHead'
import type { LinkIconType, LinkType, PageType } from '@/lib/types'
import FooterItem from './FooterItem'
import { listPage } from '../../../lib/data'
import FooterForm from './FooterForm'

const FooterTop = () => {
    const listLink: Array<LinkType> = linkList
    const listIcons: Array<LinkIconType> = listIconLink
    const pages: Array<PageType> = listPage
    return (
        <>
            <div className="py-8 px-4 md:px-12 lg:px-16 grid lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-[88px]">
                <div className="xl:hidden">
                    <div>
                        <FooterHead headTitle="Đăng ký thành viên" />
                        <p>Theo dõi chúng tôi để nhận nhiều ưu đãi</p>
                    </div>
                    <div>

                        <FooterForm />
                    </div>
                </div>
                <div>
                    <Logo />
                    <ul className="flex gap-4 items-center mt-6">
                        <li className="text-lg font-semibold"><span>Social:</span></li>
                        {
                            listIcons.map(listIcon => <FooterItem key={listIcon.id} linkIcon={listIcon} />)
                        }
                    </ul>
                </div>
                <div className="space-y-2.5">
                    <FooterHead headTitle="Giới thiệu" />
                    <ul className="space-y-2">
                        {
                            pages.map(link => <FooterItem key={link.id} link={link} />)
                        }
                    </ul>
                </div>
                <div className="space-y-2.5">
                    <FooterHead headTitle="Chính sách bán hàng" />
                    <ul className="space-y-2">
                        {
                            listLink.map(link => <FooterItem key={link.id} link={link} />)
                        }
                    </ul>
                </div>
                <div className="max-xl:hidden">
                    <div>
                        <FooterHead headTitle="Đăng ký thành viên" />
                        <p>Theo dõi chúng tôi để nhận nhiều ưu đãi</p>
                    </div>
                    <FooterForm />
                </div>
            </div>
        </>
    )
}

export default FooterTop