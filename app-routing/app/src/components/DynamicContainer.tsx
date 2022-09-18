import { useGetContentItemQuery } from '../generated'
import { useParams } from 'react-router-dom'
import Article from './Article'
import Section from './Section'
import NotFound from './NotFound'

const DynamicContainer = () => {
  const { section, content } = useParams()

  const { data, error, loading } = useGetContentItemQuery({
    variables: {
      id: content,
    },
  })

  if (error) console.log(error.message)
  if (loading) return <div>Loading...</div>

  if (data?.PageEntry?.__typename === 'Article') {
    if (data.PageEntry.section?.id === section) {
      return <Article />
    } else {
      return <NotFound />
    }
  } else if (data?.PageEntry?.__typename === 'Section') {
    return <Section />
  }
  // display NotFound page if content is not Article or Section
  return <NotFound />
}

export default DynamicContainer
