import { useGetAppArticlesQuery } from '../generated/graphql'
import Meta from '../components/Meta'
import Container from '../components/Container'
import List from '../components/List'
import Banner from '../components/Banner'
import Duo from '../components/Duo'
import styles from '../styles/pages.module.css'

const Home = () => {
  const { data, error, loading } = useGetAppArticlesQuery({
    variables: {
      title: process.env.NEXT_PUBLIC_APP_TITLE,
    },
  })

  if (error) console.log(error.message)
  if (!data?.App && !loading)
    return (
      <div className={styles.message}>
        <h3>No data... 🤔</h3>
      </div>
    )

  return (
    <>
      <Meta />
      <Banner name='News At a Glance' />
      <Container>
        {data?.App?.allArticles && (
          <Duo articles={data?.App?.allArticles.slice(0, 2)} />
        )}
        {data?.App?.allArticles && data?.App?.allArticles?.length > 2 && (
          <List articles={data?.App?.allArticles.slice(2)} />
        )}
      </Container>
    </>
  )
}

export default Home
