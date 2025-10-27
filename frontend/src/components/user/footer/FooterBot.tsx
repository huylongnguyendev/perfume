
const FooterBot = () => {
    const year = new Date().getFullYear()
    return (
        <>
            <div className="border-t border-t-muted bg-black py-2">
                <div className="text-center space-x-1.5 text-muted text-sm">
                    <span>&copy;</span>
                    <span>{year} Perfumei. All rights reserved.</span>
                </div>
            </div>
        </>
    )
}

export default FooterBot