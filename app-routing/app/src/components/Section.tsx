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

  if (error) console.log(error.message)
  if (!data?.Section && !loading) return <NotFound />

  return (
    <>
      <Banner name={data?.Section?.name} />
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
