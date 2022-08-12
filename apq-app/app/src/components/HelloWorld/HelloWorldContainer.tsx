import HelloWorld from './HelloWorld'
import HelloWorldQuery from './HelloWorldQuery'
import { useQuery } from '@apollo/client'

const HelloWorldContainer = () => {
  const { loading, error, data } = useQuery(HelloWorldQuery, {
    variables: {
      path: '/hello-world',
    },
  })

  if (loading) return <div className="hello-world-message">Loading...</div>
  if (error)
    return (
      <div className="hello-world-message">{`Error! ${error.message}`}</div>
    )

  return (
    <div className="hello-world-container">
      <HelloWorld helloWorldContent={data} />
    </div>
  )
}

export default HelloWorldContainer
