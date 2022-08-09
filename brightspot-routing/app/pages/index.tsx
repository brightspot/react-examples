import type { NextPage } from 'next'
import AppView from '../components/App/AppView'
import { useGetAllPagesQuery } from '../generated/graphql'

const Home: NextPage = () => {
  const { data, loading, error } = useGetAllPagesQuery({
    variables: {
      path: '/app',
    },
  })

  if (loading) return <div>Loading</div>
  if (error) return <div>{error.message}</div>
  if (!data?.App) return <div>404</div>

  return (
    <>
      <AppView app={data.App} />
    </>
  )
}

export default Home
