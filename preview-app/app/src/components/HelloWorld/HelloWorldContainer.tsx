import HelloWorld from './HelloWorld'
import HelloWorldQuery from './HelloWorldQuery'
import { useQuery } from '@apollo/client'

const HelloWorldContainer: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const previewId = urlParams.get('previewId')
  const VARIABLES =
    previewId != null ? { id: previewId } : { path: '/hello-world' }

  const { loading, error, data } = useQuery(HelloWorldQuery, {
    variables: VARIABLES,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>{`Error! ${error.message}`}</div>

  return (
    <>
      <HelloWorld helloWorldContent={data} />
    </>
  )
}

export default HelloWorldContainer
