import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

const GET_PAGE = gql`
  query GetPage($title: String = "") {
    Page(model: { title: $title }) {
      content
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
      title: `${page}`,
    },
  })

  console.log({ data, error })
  return (
    <div className="page-container">
      <h1>{data?.Page?.title}</h1>
      <h2>{data?.Page?.subTitle}</h2>
      <p>{data?.Page?.content}</p>
    </div>
  )
}

export default Page
