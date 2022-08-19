import HelloWorldQuery from './HelloWorldQuery'
import HelloWorld from './HelloWorld'
import { useState } from 'react'

const HelloWorldContainer = () => {
  const [error, setError] = useState({ isError: false, message: '' })
  // const [helloWorldNotFound, setHelloWorldNotFound] = useState({
  //   notFound: false,
  //   message: '',
  // })
  const [helloWorldContent, setHelloWorldContent] = useState({
    title: '',
    description: '',
  })

  const GRAPHQL = process.env.REACT_APP_GRAPHQL_URL ?? ''

  // let enteredPathname: null | string = null
  const getHelloWorld = async (input: string) => {
    try {
      const response = await fetch(GRAPHQL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: HelloWorldQuery,
          variables: {
            id: `/${input}`,
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
      console.log({ data })
      if (data?.errors) {
        setError({
          isError: true,
          message:
            'there was a problem fetching data: ' + data.errors[0].message,
        })
        throw new Error()
      }
      if (
        data?.data?.HelloWorld?.title &&
        data?.data?.HelloWorld?.description
      ) {
        console.log(
          'DATA: ',
          data?.data?.HelloWorld?.title,
          data?.data?.HelloWorld?.description
        )
        setHelloWorldContent({
          title: data.data.HelloWorld.title,
          description: data.data.HelloWorld.description,
        })
      } else {
        setHelloWorldContent({
          title: '',
          description: '',
        })
      }

      if (data.errors) {
        setError({ isError: true, message: data.errors[0].message })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="hello-world-container">
      <div className="hello-world-form">
        <label htmlFor="permalink" className="hello-world-form-text">
          Enter your HelloWorld permalink
        </label>
        <input
          required
          name="permalink"
          className="hello-world-form-input"
          onChange={(e) => {
            e.preventDefault()
            console.log('e.target.value: ', e.target.value)
            getHelloWorld(e.target.value)
          }}
        />
      </div>
      {error.isError && (
        <span className="hello-world-error">{error.message}</span>
      )}
      {helloWorldContent.title && helloWorldContent.description && (
        <HelloWorld
          title={helloWorldContent.title}
          description={helloWorldContent.description}
        />
      )}
    </div>
  )
}

export default HelloWorldContainer
