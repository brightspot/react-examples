import { useGetArticleQuery } from '../generated'
import { useParams } from 'react-router-dom'

import NotFound from './NotFound'

const Article = () => {
  const { sectionOrTag, article } = useParams()

  const { data, error, loading } = useGetArticleQuery({
    variables: {
      slug: article,
    },
  })
  if (error) console.log(error.message)
  if (!data?.Article && !loading) return <NotFound />

  const tags = data?.Article?.tags?.map((tag) => {
    return tag?.id
  })

  if (
    data &&
    data.Article?.section?.id !== sectionOrTag &&
    data &&
    !tags?.includes(sectionOrTag)
  ) {
    return <NotFound />
  }

  return (
    <div className="container">
      <h1 className="article-headline">{data?.Article?.headline}</h1>
      <p className="article-datePublished">{data?.Article?.publishDate}</p>
      <p className="article-body">{data?.Article?.body}</p>
    </div>
  )
}

export default Article
