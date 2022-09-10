import { useGetRecentArticlesQuery } from '../generated/graphql'
import Meta from '../components/Meta'
import Container from '../components/Container/Container'
import List from '../components/List/List'
import Banner from '../components/Banner/Banner'
import Duo from '../components/Duo/Duo'
import Promo from '../components/Promo/Promo'
import { Article } from '../generated/graphql'
import styles from '../styles/pages.module.css'
import { APP_TITLE } from '../components/Navbar/Navbar'

const Home = () => {
  const { data, error, loading } = useGetRecentArticlesQuery({
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

  console.log({ data })
  // const allArticles: Article[] = []
  // data?.App?.Page_app_connection?.items.forEach((item) => {
  //   if (item.Article_page_connection?.items) {
  //     allArticles.push(...item.Article_page_connection.items)
  //   }
  // })

  // allArticles.sort(
  //   (a, b) => b.cms_content?.publishDate - a.cms_content?.publishDate
  // )

  return (
    <>
      <Meta />
      <Banner name='Top News' />
      <Container>
        <h1>Hello there</h1>
        {/* <Duo articles={allArticles.slice(0, 2)} />
        <List articles={allArticles.slice(2, 6)} />
        <Promo article={allArticles[6] ? allArticles[6] : allArticles[0]} /> */}
      </Container>
    </>
  )
}

export default Home