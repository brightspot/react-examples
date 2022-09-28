import { useGetArticleQuery } from '../generated'
import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import NotFound from './NotFound'

const Article = () => {
  const { section, article } = useParams()
  const navigate = useNavigate()
  const { data, error, loading } = useGetArticleQuery({
    variables: {
      path: article,
    },
  })

  useEffect(() => {
    // redirects to new section path if user navigates to old section path
    if (data?.Article && data.Article.section?.path?.slice(1) !== section) {
      navigate(`${data.Article.section?.path}${data.Article.path}`)
    }
    // redirects to new article path if user navigates to old article path
    if (data?.Article && data.Article.path?.slice(1) !== article) {
      navigate(`${data.Article.section?.path}${data.Article.path}`)
    }
  }, [data, section, article, navigate])

  if (error) console.log(error.message)
  if (loading) return <div className="loading">loading...</div>
  if (!data?.Article) return <NotFound />

  // removes leading '/' when comparing to url param
  if (data.Article.section?.path?.slice(1) !== section) return <NotFound />

  let publishDate = new Date(data.Article.publishDate || 0)

  return (
    <div className="container">
      <h1 className="article-headline">{data.Article.headline}</h1>
      <span className="article-datePublished">
        {publishDate.toDateString() + ' - ' + publishDate.toTimeString()}
      </span>
      <br />
      <Link to={`${data.Article.section?.path}`}>
        <p className="article-sectionName">{data.Article.section?.name}</p>
      </Link>
      <p className="article-body">{data.Article.body}</p>
    </div>
  )
}

export default Article
