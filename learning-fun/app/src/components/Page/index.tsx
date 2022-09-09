import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import underline from '../../images/underline.png'
const GET_PAGE = gql`
  query GetPage($id: ID, $title: String) {
    Page(model: { title: $title, id: $id }) {
      content
      title
      subtitle
    }
  }
`
const Page = () => {
  const { title } = useParams()

  const previewId = new URLSearchParams(window.location.search).get('previewId')

  const variable = previewId != null ? { id: previewId } : { title: title }
  const { data, loading, error } = useQuery(GET_PAGE, {
    variables: variable,
  })
  if (loading) return <h3 className="loading">Loading...</h3>

  if (!data?.Page) {
    return <h2 className="not-found">Page not found 🤔...</h2>
  }

  return (
    <div className="page-container">
      <h1 className="page-title">{data?.Page?.title}</h1>
      <img src={underline} alt="underline" />
      <h2>{data?.Page?.subTitle}</h2>
      <p>{data?.Page?.content}</p>
      {error && (
        <p className="error">{`There was an error fetching data for the page: ${error} `}</p>
      )}
    </div>
  )
}

export default Page
