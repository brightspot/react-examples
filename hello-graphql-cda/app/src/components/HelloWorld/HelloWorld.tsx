type Props = {
  title: string
  text: string
}

const HelloWorld = ({ title, text }: Props) => {
  return (
    <div className="hello-world-output">
      <h1 className="hello-world-text">{title}</h1>
      <h3 className="hello-world-text">{text}</h3>
    </div>
  )
}

export default HelloWorld
