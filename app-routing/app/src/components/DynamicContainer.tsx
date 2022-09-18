import { useGetContentItemQuery } from '../generated'
import { useParams } from 'react-router-dom'
import Article from './Article'
import Section from './Section'
import NotFound from './NotFound'

const DynamicContainer = () => {
  const { section, content } = useParams()

  const { data, error } = useGetContentItemQuery({
    variables: {
        id: content
    }
  })

  if (error) console.log(error.message)
  console.log({ content })

  console.log({ data })
  if(data?.PageEntry?.__typename ==='Article' ) {
    console.log('Article!!')
    if (data.PageEntry.section?.id === section) {
      return <Article article={content}/>
    } else {
      return <NotFound />
    }
  } else if (data?.PageEntry?.__typename ==='Section') {
    console.log('Section!!')
    return <Section />
  } 
  // display NotFound page if content is not Article or Section
  return (
    <NotFound />
  )
}

export default DynamicContainer
