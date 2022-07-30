import type { NextPage } from 'next'
import { useGetAppQuery, useGetFirstArticlesQuery } from '../generated/graphql'
import Layout from '../components/Layout/Layout'
import Head from 'next/head'
import Container from '../components/Container/Container'
import List from '../components/List/List'
import Banner from '../components/Banner/Banner'

const Home: NextPage = () => {

  const { data, loading, error } = useGetAppQuery({
    variables: {
      path: '/news'
    }
  })

  const { data:firstArticlesData, loading: firstArticlesLoading, error: firstArticlesError } = useGetFirstArticlesQuery({
    variables: {
      path: '/news'
    } 
  })

  console.log('data', data, loading, error)
  console.log('firstArticlesData', firstArticlesData, firstArticlesLoading, firstArticlesError)
  if (loading) console.log(loading)
  if (error) console.log(error)
  // if (!data?.App) return <div>404</div>

  const pagesArray = firstArticlesData?.App?.Page_app_connection?.items
  console.log({ pagesArray })

  const topArticles =  pagesArray?.map((item) => {
    return item.Article_page_connection?.items[0]
  })
  console.log({ topArticles })
  return (
    <Layout>
      <Head>
        <title>News</title>
      </Head>
      <Container>
     <Banner />
      <List />
      </Container>
    </Layout>
  )
}

export default Home
