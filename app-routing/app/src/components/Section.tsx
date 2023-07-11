import { useGetSectionQuery } from '../generated'
import { useParams } from 'react-router-dom'

import Banner from './Banner'
import List from './List'
import NotFound from './NotFound'

const Section = () => {
  const { section } = useParams()

  const { data, error, loading } = useGetSectionQuery({
    variables: {
      slug: section,
    },
  })

  if (loading) return <div className="loading">loading...</div>

  if (error)
    return <div className="message">An error occurred: {error?.message}</div>

  if (!data?.Section) return <NotFound />

  return (
    <>
      <Banner name={`Section: ${data?.Section?.name}`} />
      <div className="container">
        {data.Section?.articles && (
          <>
            <List articles={data.Section?.articles} />
          </>
        )}
      </div>
    </>
  )
}

export default Section
