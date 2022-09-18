import { useGetArticleQuery } from '../generated'

import NotFound from './NotFound'

type Props = {
  article?: string
}

const Article = ({article}: Props) => {
  const { data, error, loading } = useGetArticleQuery({
    variables: {
      id: article,
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
