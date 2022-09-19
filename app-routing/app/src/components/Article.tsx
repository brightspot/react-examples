import { useGetArticleQuery } from '../generated'
import { Link, useParams } from 'react-router-dom'

import NotFound from './NotFound'

const Article = () => {
  const { sectionOrTag, article } = useParams()

  const { data, error, loading } = useGetArticleQuery({
    variables: {
      slug: article,
    },
  })
  if (error) console.log(error.message)
  if (loading) return <div className="loading">loading...</div>
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
      <Link to={`/${data?.Article?.section?.id}`}>
        <p className="article-sectionName">{data?.Article?.section?.name}</p>
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
