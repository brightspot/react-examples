type Props = {
  helloWorldContent: {
    HelloWorld: {
      title: string
      text: string
    }
  }
}

const HelloWorld = ({ helloWorldContent }: Props) => {
  const { title, text } = helloWorldContent.HelloWorld

  return (
    <>
      <h1 className='hello-world-text'>{title}</h1>
      <h3 className='hello-world-text'>{text}</h3>
    </>
  )
}

export default HelloWorld
