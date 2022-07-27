import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useGetArticlesQuery } from '../../generated/graphql'
import SectionView from '../../components/Section/SectionView'

const Example: NextPage = () => {

  const router = useRouter()
  const { section } = router.query

  const { data, loading, error } = useGetArticlesQuery({
    variables: {
      path: `${section}`
    }
  })

  if (loading) return <div>Loading</div>
  if (error) return <div>{error.message}</div>
  if (!data?.Section) return <div>404</div>

  return (
    <>
      <SectionView section={data.Section}/>
    </>
  )
}

export default Example
