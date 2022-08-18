import HelloWorldQuery from './HelloWorldQuery'
import HelloWorld from './HelloWorld'
import { useState, useRef } from 'react'
type Props = {
  helloWorldContent: {
    title: string
    description: string
  }
  setHelloWorldContent: React.Dispatch<
    React.SetStateAction<{
      title: string
      description: string
    }>
  >
}

const HelloWorldContainer = ({
  helloWorldContent,
  setHelloWorldContent,
}: Props) => {
  const [error, setError] = useState({ isError: false, message: '' })
  const [helloWorldNotFound, setHelloWorldNotFound] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const GRAPHQL = process.env.REACT_APP_GRAPHQL_URL ?? ''

  let enteredPathname: null | string = null
  const getHelloWorld = async () => {
    try {
      const response = await fetch(GRAPHQL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: HelloWorldQuery,
          variables: {
            id: `/${enteredPathname}`,
          },
        }),
      })
      if (!response.ok) {
        setError({
          isError: true,
          message:
            'there was a problem fetching data... ' + response.statusText,
        })
        throw new Error()
      }
      const data = await response.json()
      if (
        data?.data?.HelloWorld?.title &&
        data?.data?.HelloWorld?.description
      ) {
        setHelloWorldContent({
          title: data.data.HelloWorld.title,
          description: data.data.HelloWorld.description,
        })
      } else if (data?.data?.HelloWorld === null) {
        setHelloWorldNotFound(true)
      }

      if (inputRef.current?.value) {
        inputRef.current.value = ''
      }

      if (data.errors) {
        setError({ isError: true, message: data.errors[0].message })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = () => {
    setError({ isError: false, message: '' })
    if (inputRef?.current?.value) {
      enteredPathname = inputRef.current.value
      if (enteredPathname) {
        getHelloWorld()
      } else {
        console.log('there was a problem getting the input')
      }
    }
  }

  return (
    <div className="hello-world-container">
      <form
        className="hello-world-form"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <p className="hello-world-form-text">Enter your HelloWorld permalink</p>
        <input required className="hello-world-form-input" ref={inputRef} />
        <button className="hello-world-form-button" type="submit">
          Submit
        </button>
      </form>
      {error.isError && (
        <span className="hello-world-error">{error.message}</span>
      )}
      {helloWorldContent.title && helloWorldContent.description ? (
        <HelloWorld
          title={helloWorldContent.title}
          description={helloWorldContent.description}
        />
      ) : helloWorldNotFound ? (
        <div className="hello-world-404">
          No HelloWorld found with that permalink 😔
        </div>
      ) : null}
    </div>
  )
}

export default HelloWorldContainer
