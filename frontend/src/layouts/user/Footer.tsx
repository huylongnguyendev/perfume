import FooterBot from '@/components/user/footer/FooterBot'
import FooterTop from '@/components/user/footer/FooterTop'

const Footer = () => {
    return (
        <>
            <footer className="bg-background drop-shadow-2xl">
                <FooterTop />
                <FooterBot />
            </footer>
        </>
    )
}

export default Footer