import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useGetPageArticlesQuery } from '../../generated/graphql'
import PageComponent from '../../components/Page/PageComponent'

const PageContainer: NextPage = () => {
  const router = useRouter()
  const { pagePath } = router.query

  const { data, loading, error } = useGetPageArticlesQuery({
    variables: {
      path: `${pagePath}`,
    },
  })

  if (loading) return <div>Loading</div>
  if (error) return <div>{error.message}</div>
  if (!data?.Page) return <div>404</div>

  return (
    <>
      <PageComponent page={data.Page} />
    </>
  )
}

export default PageContainer
