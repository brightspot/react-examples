import HelloWorldQuery from './HelloWorldQuery'
import HelloWorld from './HelloWorld'
import { useState, useRef, useEffect } from 'react'
type Props = {
  helloWorldContent: any
  setHelloWorldContent: Function
}

const HelloWorldContainer = ({
  helloWorldContent,
  setHelloWorldContent,
}: Props) => {
  const [error, setError] = useState({ isError: false, message: '' })
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
            id: enteredPathname
              ? `/${enteredPathname}`
              : sessionStorage.getItem('hello-world'),
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
      console.log('Your DATA!!!', data)
      if (data.data) {
        setHelloWorldContent({
          title: data.data.HelloWorld.title,
          text: data.data.HelloWorld.text,
        })

        if (inputRef.current?.value) {
          inputRef.current.value = ''
        }
      }

      if (data.errors) {
        setError({ isError: true, message: data.errors[0].message })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getHelloWorld()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = () => {
    if (inputRef?.current?.value) {
      console.log('there is a inputRef.current.value')
      enteredPathname = inputRef.current.value
      sessionStorage.setItem('hello-world', enteredPathname)
    }
    getHelloWorld()
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
        <span className="hello-world-message">{error.message}</span>
      )}
      <HelloWorld
        title={helloWorldContent.title}
        text={helloWorldContent.text}
      />
    </div>
  )
}

export default HelloWorldContainer
