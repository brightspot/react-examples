import HelloWorldQuery from './HelloWorldQuery'
import HelloWorld from './HelloWorld'
import { useLazyQuery } from '@apollo/client'
import { useState } from 'react'

const HelloWorldContainer = () => {
  const [permalink, setPermalink] = useState('')
  const [getHelloWorld, { error, data }] = useLazyQuery(HelloWorldQuery, {
    variables: {
      id: `/${permalink}`,
    },
  })

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
            setPermalink(e.target.value)
            console.log(permalink)
            getHelloWorld()
          }}
        />
      </div>
      {error && <span className="hello-world-error">{error.message}</span>}
      {data?.HelloWorld?.title && data?.HelloWorld?.description && (
        <HelloWorld
          title={data.HelloWorld.title}
          description={data.HelloWorld.description}
        />
      )}
    </div>
  )
}

export default HelloWorldContainer
