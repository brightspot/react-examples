import HelloWorld from './HelloWorld'
import HelloWorldQuery from './HelloWorldQuery'
import { useQuery } from '@apollo/client'

const HelloWorldContainer = () => {
  const { loading, error, data } = useQuery(HelloWorldQuery, {
    variables: {
      path: '/hello-world',
    },
  })

  if (loading) return <div>'Loading...'</div>
  if (error) return <div>`Error! ${error.message}`</div>

  return (
    <>
      <HelloWorld helloWorldContent={data} />
    </>
  )
}

export default HelloWorldContainer
