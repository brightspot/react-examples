import { useGetAppArticlesQuery } from '../generated/graphql'
import Meta from '../components/Meta'
import Container from '../components/Container/Container'
import List from '../components/List/List'
import Banner from '../components/Banner/Banner'
import Duo from '../components/Duo/Duo'
import Promo from '../components/Promo/Promo'
import { Article } from '../generated/graphql'
import styles from '../styles/pages.module.css'
import { APP_TITLE } from '../components/Navbar/Navbar'

export type PartialArticle = Omit<Article, 'body'> | null

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

  const allArticles: PartialArticle[] = []
  if (data?.App?.pages) {
    data?.App?.pages?.forEach((item) => {
      if (item?.articles) {
        allArticles.push(...item.articles)
      }
    })
  }

  return (
    <>
      <Meta />
      <Banner name='Top News' />
      <Container>
        <Duo articles={allArticles.slice(0, 2)} />
        {allArticles.length > 2 && <List articles={allArticles.slice(2, 6)} />}
        {allArticles.length > 5 && (
          <Promo article={allArticles[6] ? allArticles[6] : allArticles[0]} />
        )}
      </Container>
    </>
  )
}

export default Home
