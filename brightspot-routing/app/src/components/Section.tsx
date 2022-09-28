import { useGetSectionQuery } from '../generated'
import { useParams, useNavigate } from 'react-router-dom'

import Banner from './Banner'
import List from './List'
import NotFound from './NotFound'

const Section = () => {
  const { section } = useParams()
  const navigate = useNavigate()

  const { data, error, loading } = useGetSectionQuery({
    variables: {
      path: section,
    },
  })

  if (error) console.log(error.message)
  if (loading) return <div className="loading">loading...</div>
  if (!data?.Section) return <NotFound />

  // redirects to new URL if user navigated to old URL
  if (data.Section.path?.slice(1) !== section) {
    navigate(`${data.Section.path}`)
  }

  return (
    <>
      <Banner name={`Section: ${data?.Section?.name}`} />
      <div className="container">
        {data.Section.articles && (
          <>
            <List section={data.Section} />
          </>
        )}
      </div>
    </>
  )
}

export default Section
