import type { NextPage } from 'next'
import HomeView from '../components/Home/HomeView'
import { useGetSectionsQuery } from '../generated/graphql'

const Home: NextPage = () => {

  const { data, loading, error } = useGetSectionsQuery({
    variables: {
      path: '/home'
    }
  })

  if (loading) return <div>Loading</div>
  if (error) return <div>{error.message}</div>
  if (!data?.Page) return <div>404</div>

  return (
    <>
      <HomeView page={data.Page}/>
    </>
  )
}

export default Home
