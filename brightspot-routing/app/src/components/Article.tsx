import { useGetArticleQuery } from '../generated'
import { Link, useParams } from 'react-router-dom'

import NotFound from './NotFound'

const Article = () => {
  const { section, article } = useParams()
  const { data, error, loading } = useGetArticleQuery({
    variables: {
      path: article,
    },
  })

  if (error) console.log(error.message)
  if (loading) return <div className="loading">loading...</div>
  if (!data?.Article && !loading) return <NotFound />

  // removes leading '/' when comparing to url param
  if (data?.Article?.section?.path?.slice(1) !== section) return <NotFound />

  let publishDate = new Date()

  return (
    <div className="container">
      <h1 className="article-headline">{data?.Article?.headline}</h1>
      <span className="article-datePublished">
        {publishDate.toDateString() + ' - ' + publishDate.toTimeString()}
      </span>
      <br />
      <Link to={`${data?.Article?.section?.path}`}>
        <p className="article-sectionName">{data?.Article?.section?.name}</p>
      </Link>
      <p className="article-body">{data?.Article?.body}</p>
    </div>
  )
}

export default Article
