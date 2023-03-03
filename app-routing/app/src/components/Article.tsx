import { useGetArticleQuery } from '../generated'
import { Link, useParams } from 'react-router-dom'

import NotFound from './NotFound'

const Article = () => {
  const { section, article } = useParams()
  const { data, error, loading } = useGetArticleQuery({
    variables: {
      slug: article,
    },
  })

  if (loading) return <div className="loading">loading...</div>

  if (error)
    return <div className="message">An error occurred: {error?.message}</div>

  if (!data?.Article) return <NotFound />

  if (data.Article.section?.slug !== section) {
    return <NotFound />
  }

  return (
    <div className="container">
      <h1 className="article-headline">{data?.Article?.headline}</h1>
      <span className="article-datePublished">{data.Article?.publishDate}</span>
      <br />
      <Link to={`/${data?.Article?.section?.slug}`}>
        <p className="article-sectionName">{data.Article?.section?.name}</p>
      </Link>
      {data.Article?.tags?.map((tag, i) => (
        <Link
          to={`/tags/${tag?.slug}`}
          key={i}
          className="article-tagLink"
        >{`${tag?.category}`}</Link>
      ))}
      <p className="article-body">{data.Article?.body}</p>
    </div>
  )
}

export default Article
