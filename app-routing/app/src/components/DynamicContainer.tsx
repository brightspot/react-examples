import { useGetContentItemQuery } from '../generated'
import { useParams } from 'react-router-dom'

import NotFound from './NotFound'
import Section from './Section'
import Tag from './Tag'

const DynamicContainer = () => {
  const { content } = useParams()
  const { data, error, loading } = useGetContentItemQuery({
    variables: {
      id: content,
    },
  })

  if (error) console.log(error.message)
  if (loading) return <div>Loading...</div>

  if (data?.PageEntry?.__typename === 'Article') {
    return <NotFound />
  } else if (data?.PageEntry?.__typename === 'Section') {
    return <Section />
  } else if (data?.PageEntry?.__typename === 'Tag') {
    return <Tag />
  }
  // display NotFound page if content is not Article or Section
  return <NotFound />
}

export default DynamicContainer
