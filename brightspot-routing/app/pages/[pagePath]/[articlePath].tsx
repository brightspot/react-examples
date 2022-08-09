import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useGetArticleQuery } from '../../generated/graphql'
import ArticleView from '../../components/Article/ArticleView'

const ArticleContainer: NextPage = () => {
  const router = useRouter()
  const { articlePath } = router.query

  const { data, loading, error } = useGetArticleQuery({
    variables: {
      path: `${articlePath}`,
    },
  })

  if (loading) return <div>Loading</div>
  if (error) return <div>{error.message}</div>
  if (!data?.Article) return <div>404</div>

  return (
    <>
      <ArticleView article={data.Article} />
    </>
  )
}

export default ArticleContainer
