import { useGetSectionQuery } from '../generated'
import { useEffect } from 'react'
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

  useEffect(() => {
    // redirects to new URL if user navigated to old URL
    if (data?.Section && data?.Section?.path?.slice(1) !== section) {
      navigate(`${data?.Section?.path}`)
    }
  }, [data, section, navigate])

  if (error) console.log(error.message)
  if (loading) return <div className="loading">loading...</div>
  if (!data?.Section) return <NotFound />

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
