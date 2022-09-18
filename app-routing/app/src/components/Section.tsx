import { useGetSectionQuery } from '../generated'
import { useParams } from 'react-router-dom'

import Banner from './Banner'
import List from './List'
import NotFound from './NotFound'
import { useContext } from 'react'
import { RoutingContext } from './RoutingContext'

const Section = () => {
  const { content, section } = useParams()
  console.log(content)
  const value = useContext(RoutingContext)
  console.log({ value })

  const sectionVariables = value === 1 ? {id: content} : value === 2? {slug: section} : {}
  console.log({ sectionVariables })
  const { data, error, loading } = useGetSectionQuery({
    variables: sectionVariables
    // variables: {
    //   id: content, // Routing Option 1
    //   slug: section // Routing Option 2
    // }
  })

  if (error) console.log(error.message)
  if (!data?.Section && !loading) return <NotFound />
    console.log({ data })
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
