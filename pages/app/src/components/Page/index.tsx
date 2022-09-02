import { useParams } from 'react-router-dom'

const Page = () => {
  const { page } = useParams()
  return <h1>{`I am a ${page} page `}</h1>
}

export default Page
