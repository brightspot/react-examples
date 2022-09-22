import { useGetArticleQuery } from '../generated'
import { Link, useParams } from 'react-router-dom'

import NotFound from './NotFound'

const Article = () => {
  const { section, article, content } = useParams()
  const { data, error, loading } = useGetArticleQuery({
    variables: {
      slug: article,
      id: content,
    },
  })
  if (error) console.log(error.message)
  if (loading) return <div className="loading">loading...</div>
  if (!data?.Article && !loading) return <NotFound />

  if (data?.Article?.section?.id && data.Article?.section?.id !== section) {
    return <NotFound />
  } else if (!data?.Article?.section && section) {
    return <NotFound />
  }

  return (
    <div className="container">
      <h1 className="article-headline">{data?.Article?.headline}</h1>
      <p className="article-datePublished">{data?.Article?.publishDate}</p>
      <Link to={`/${data?.Article?.section?.id}`}>
        <p className="article-sectionName">
          {data?.Article?.section?.name || 'various'}
        </p>
      </Link>
      {data?.Article?.tags?.map((tag, i) => {
        return (
          <Link
            to={`/${tag?.id}`}
            key={i}
            className="article-tagLink"
          >{`${tag?.category}`}</Link>
        )
      })}
      <p className="article-body">{data?.Article?.body}</p>
    </div>
  )
}

export default Article
