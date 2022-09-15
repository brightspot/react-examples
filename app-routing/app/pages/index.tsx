import { useGetAllArticlesQuery } from '../generated/graphql'
import Meta from '../components/Meta'
import Container from '../components/Container'
import CardList from '../components/CardList'
import Banner from '../components/Banner'
import styles from '../styles/pages.module.css'

const Home = () => {
  const { data, error, loading } = useGetAllArticlesQuery()

  if (error) console.log(error.message)
  if (!data?.Articles && !loading)
    return (
      <div className={styles.message}>
        <h3>No data... 🤔</h3>
      </div>
    )

  return (
    <>
      <Meta />
      <Banner name="News At a Glance" />
      <Container>
        {data?.Articles?.articles && (
          <>
            <CardList articles={data?.Articles?.articles} />
          </>
        )}
      </Container>
    </>
  )
}

export default Home
