import { useGetArticleQuery } from '../generated'
import { useParams } from 'react-router-dom'

import NotFound from './NotFound'

const Article = () => {
  const { article } = useParams()
  const { data, error, loading } = useGetArticleQuery({
    variables: {
      slug: article,
    },
  })
  if (error) console.log(error.message)
  if (!data?.Article && !loading) return <NotFound />

  return (
    <div className="container">
      <h1 className="article-headline">{data?.Article?.headline}</h1>
      <p className="article-datePublished">{data?.Article?.publishDate}</p>
      <p className="article-body">{data?.Article?.body}</p>
    </div>
  )
}

export default Article
