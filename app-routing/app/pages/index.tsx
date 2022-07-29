import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import AppView from '../components/App/AppView'
import { useGetAppQuery } from '../generated/graphql'
import Layout from '../components/Layout/Layout'
import Head from 'next/head'
import Container from '../components/Container/Container'

const Home: NextPage = () => {

  const { data, loading, error } = useGetAppQuery({
    variables: {
      path: '/news'
    }
  })
  console.log('data', data, loading, error)
  if (loading) return <div>Loading...</div>
  if (error) console.log(error)
  if (!data?.App) return <div>404</div>
  console.log('data', data)
  return (
    <Layout>
      <Head>
        <title>News</title>
      </Head>
      <Container>
      <h1>Welcome to App Routing!</h1>
      {/* <AppView page={data?.page} /> */}
      </Container>
    </Layout>
  )
}

export default Home
