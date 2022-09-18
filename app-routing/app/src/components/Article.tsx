import { useGetArticleQuery } from '../generated'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { RoutingContext } from './RoutingContext'

import NotFound from './NotFound'

const Article = () => {
  const context = useContext(RoutingContext)
  const { content, section, article } = useParams()

  const articleVariables =
    context?.routingOption === 1
      ? { id: content }
      : context?.routingOption === 2
      ? { slug: article }
      : {}
  const { data, error, loading } = useGetArticleQuery({
    variables: articleVariables,
  })
  if (error) console.log(error.message)
  if (!data?.Article && !loading) return <NotFound />

  if (
    data &&
    data.Article?.section?.slug !== section &&
    data.Article?.section?.id !== section
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
