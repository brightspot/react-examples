type Props = {
  title: string
  description: string
}

const HelloWorld = ({ title, description }: Props) => {
  console.log({ title, description })
  return (
    <div className="hello-world-output">
      <h1 className="hello-world-text">{title}</h1>
      <h3 className="hello-world-text">{description}</h3>
    </div>
  )
}

export default HelloWorld
