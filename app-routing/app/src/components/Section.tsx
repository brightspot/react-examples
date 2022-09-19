import { useGetSectionQuery } from '../generated'
import { useParams } from 'react-router-dom'

import Banner from './Banner'
import List from './List'
import NotFound from './NotFound'

const Section = () => {
  const { content } = useParams()

  const { data, error, loading } = useGetSectionQuery({
    variables: {
      id: content,
    },
  })

  if (error) console.log(error.message)
  if (loading) return <div className="loading">loading...</div>
  if (!data?.Section && !loading) return <NotFound />

  return (
    <>
      <Banner name={`Section: ${data?.Section?.name}`} />
      <div className="container">
        {data?.Section?.articles && (
          <>
            <List articles={data?.Section?.articles} />
          </>
        )}
      </div>
    </>
  )
}

export default Section
