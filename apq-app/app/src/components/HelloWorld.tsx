import HelloWorldQuery from '../queries/HelloWorld'
import { useQuery } from '@apollo/client'

const HelloWorld = () => {
  const { loading, error, data } = useQuery(HelloWorldQuery, {
    variables: {
      path: '/hello-world',
    },
  })

  if (loading) return <div>'Loading...'</div>
  if (error) return <div>`Error! ${error.message}`</div>
  if (!data) return <div>No Data is available</div>
  console.log({ data })

  const { title, text } = data.HelloWorld
  console.log({ title, text })
  return (
    <div>
      <h1 className='hello-world-text'>{title}</h1>
      <h3 className='hello-world-text'>{text}</h3>
    </div>
  )
}

export default HelloWorld
