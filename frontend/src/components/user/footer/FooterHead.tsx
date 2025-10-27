interface Props {
    headTitle: string
}

const FooterHead = ({ headTitle }: Props) => {
    return (
        <>
            <h4 className="text-xl font-semibold">{headTitle}</h4>
        </>
    )
}

export default FooterHead