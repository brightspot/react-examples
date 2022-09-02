import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

const GET_PAGE = gql`
  query GetPage($path: String = "/home") {
    Page(path: $path) {
      catchPhrase
      subTitle
      title
    }
  }
`
const Page = () => {
  const { page } = useParams()
  console.log({ page })
  const { data, error } = useQuery(GET_PAGE, {
    variables: {
      path: `/${page}`,
    },
  })

  console.log({ data, error })
  return (
    <>
      <h1>{data?.Page?.title}</h1>
      <h2>{data?.Page?.subTitle}</h2>
      <p>{data?.Page?.catchPhrase}</p>
    </>
  )
}

export default Page
