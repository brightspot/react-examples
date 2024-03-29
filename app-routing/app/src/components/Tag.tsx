import { useGetTagQuery } from '../generated'
import { useParams } from 'react-router-dom'

import Banner from './Banner'
import List from './List'
import NotFound from './NotFound'

const Tag = () => {
  const { tag } = useParams()
  const { data, error, loading } = useGetTagQuery({
    variables: {
      slug: tag,
    },
  })

  if (loading) return <div className="loading">loading...</div>

  if (error)
    return <div className="message">An error occurred: {error?.message}</div>

  if (!data?.Tag) return <NotFound />

  return (
    <>
      <Banner name={`Tag: ${data?.Tag?.category}`} />
      <div className="container">
        {data.Tag?.articles && (
          <>
            <List articles={data.Tag?.articles} />
          </>
        )}
      </div>
    </>
  )
}

export default Tag
