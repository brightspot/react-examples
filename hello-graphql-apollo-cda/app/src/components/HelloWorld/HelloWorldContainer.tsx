import HelloWorldQuery from './HelloWorldQuery'
import HelloWorld from './HelloWorld'
import { useLazyQuery } from '@apollo/client'
import { useRef, useState } from 'react'

const HelloWorldContainer = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [helloWorldNotFound, setHelloWorldNotFound] = useState({
    notFound: false,
    message: '',
  })

  const [getHelloWorld, { error, data }] = useLazyQuery(HelloWorldQuery, {
    variables: {
      id: `/${inputRef?.current?.value}`,
    },
  })

  if (data && inputRef?.current?.value) {
    if (!data?.HelloWorld) {
      setHelloWorldNotFound({
        notFound: true,
        message: `did not find HelloWorld with permalink: "${inputRef?.current?.value}" 😔`,
      })
    }
    inputRef.current.value = ''
  }
  return (
    <div className="hello-world-container">
      <form
        className="hello-world-form"
        onSubmit={(e) => {
          e.preventDefault()
          if (inputRef?.current?.value) {
            getHelloWorld()
          }
        }}
      >
        <label htmlFor="permalink" className="hello-world-form-text">
          Enter your HelloWorld permalink
        </label>
        <input
          required
          name="permalink"
          className="hello-world-form-input"
          ref={inputRef}
        />
        <button className="hello-world-form-button" type="submit">
          Submit
        </button>
      </form>
      {error && <span className="hello-world-error">{error.message}</span>}
      {data?.HelloWorld?.title && data?.HelloWorld?.description ? (
        <HelloWorld
          title={data.HelloWorld.title}
          description={data.HelloWorld.description}
        />
      ) : helloWorldNotFound.notFound ? (
        <div className="hello-world-404">{helloWorldNotFound.message}</div>
      ) : null}
    </div>
  )
}

export default HelloWorldContainer
