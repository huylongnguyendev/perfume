
interface Props {
  gender: {
    name: string
    value: string
    desc: string
  }
}

const GenderItem = ({ gender }: Props) => {
  return (
    <>
      <div className={"bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-md p-4 space-y-2 text-white border transition-all duration-300 group-hover:scale-[1.02]"}>
        <h2 className="text-white font-semibold text-lg">{gender.name}</h2>
        <p className="">{gender.desc}</p>
      </div>
    </>
  )
}

export default GenderItem