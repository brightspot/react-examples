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

  if (loading) return <div className='hello-world-message'>Loading...</div>
  if (error)
    return (
      <div className='hello-world-message'>{`Error! ${error.message}`}</div>
    )

  return (
    <div className='hello-world-container'>
      <HelloWorld helloWorldContent={data} />
    </div>
  )
}

export default HelloWorldContainer
