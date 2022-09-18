import { useGetSectionQuery } from '../generated'
import { useParams } from 'react-router-dom'

import Banner from './Banner'
import List from './List'
import NotFound from './NotFound'
import { useContext } from 'react'
import { RoutingContext } from './RoutingContext'

const Section = () => {
  const context = useContext(RoutingContext)
  const { content, section } = useParams()

  // Routing Option 1: id, RoutingOption 2: slug
  const sectionVariables =
    context?.routingOption === 1
      ? { id: content }
      : context?.routingOption === 2
      ? { slug: section }
      : {}
  console.log({ sectionVariables })
  const { data, error, loading } = useGetSectionQuery({
    variables: sectionVariables,
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
