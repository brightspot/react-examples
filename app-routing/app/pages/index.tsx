import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import AppView from '../components/App/AppView'
import { useGetAppQuery } from '../generated/graphql'


const Home: NextPage = () => {

  // const { data, loading, error } = useGetAppQuery({
  //   variables: {
  //     path: '/news'
  //   }
  // })
  // console.log('data', data, loading, error)
  // if (loading) return <div>Loading...</div>
  // if (error) return <div>{error.message}</div>
  // if (!data?.App) return <div>404</div>
  // console.log('data', data)
  return (
    <div className={styles.container}>
      <h1>Welcome to App Routing!</h1>
      {/* <AppView page={data?.page} /> */}
    </div>
  )
}

export default Home
