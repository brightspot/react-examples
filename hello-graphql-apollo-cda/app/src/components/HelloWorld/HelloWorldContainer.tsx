import HelloWorldQuery from './HelloWorldQuery'
import HelloWorld from './HelloWorld'
import { useLazyQuery } from '@apollo/client'
import { useRef } from 'react'

const HelloWorldContainer = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [getHelloWorld, { error, data }] = useLazyQuery(HelloWorldQuery, {
    variables: {
      id: `/${inputRef?.current?.value}`,
    },
  })

  if (data?.HelloWorld?.title && inputRef?.current?.value) {
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
        <p className="hello-world-form-text">Enter your HelloWorld permalink</p>
        <input required className="hello-world-form-input" ref={inputRef} />
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
      ) : data?.HelloWorld === null ? (
        <div className="hello-world-404">
          No HelloWorld found with that permalink 😔
        </div>
      ) : null}
    </div>
  )
}

export default HelloWorldContainer
