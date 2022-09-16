type Props = {
  name: string | null | undefined
}

const Banner = ({ name }: Props) => {
  return (
    <div className="banner-container">
      <h1 className="banner-title">{name}</h1>
    </div>
  )
}

export default Banner
