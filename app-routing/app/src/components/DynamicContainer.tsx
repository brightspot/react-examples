import { useGetContentItemQuery } from '../generated'
import { useParams } from 'react-router-dom'

import Article from './Article'
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

  switch (data?.PageEntry?.__typename) {
    case 'Article':
      return <Article />
    case 'Section':
      return <Section />
    case 'Tag':
      return <Tag />
    default:
      return <NotFound />
  }
}

export default DynamicContainer
