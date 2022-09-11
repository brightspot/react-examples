import { useGetAppArticlesQuery } from '../generated/graphql'
import Meta from '../components/Meta'
import Container from '../components/Container/Container'
import List from '../components/List/List'
import Banner from '../components/Banner/Banner'
import Duo from '../components/Duo/Duo'
import Promo from '../components/Promo/Promo'
import styles from '../styles/pages.module.css'
import { APP_TITLE } from '../components/Navbar/Navbar'

const Home = () => {
  const { data, error, loading } = useGetAppArticlesQuery({
    variables: {
      title: APP_TITLE,
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
      <Banner name='Top News' />
      <Container>
        {data?.App?.allArticles && (
          <Duo articles={data?.App?.allArticles.slice(0, 2)} />
        )}
        {data?.App?.allArticles && data?.App?.allArticles?.length > 2 && (
          <List articles={data?.App?.allArticles.slice(2, 6)} />
        )}
        {data?.App?.allArticles && data?.App?.allArticles?.length > 5 && (
          <Promo article={data?.App?.allArticles[6]} />
        )}
      </Container>
    </>
  )
}

export default Home
