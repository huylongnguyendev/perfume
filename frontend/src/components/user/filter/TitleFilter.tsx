interface Props {
    title: string
}
const TitleFilter = ({ title }: Props) => {
    return (
        <>
            <h3 className="font-semibold uppercase my-2">{title}</h3>
        </>
    )
}

export default TitleFilter