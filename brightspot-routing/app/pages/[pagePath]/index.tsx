import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useGetPageArticlesQuery } from '../../generated/graphql'
import PageView from '../../components/Page/PageView'

const Example: NextPage = () => {
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
      <PageView page={data.Page} />
    </>
  )
}

export default Example
