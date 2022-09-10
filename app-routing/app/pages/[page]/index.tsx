import { useRouter } from 'next/router'
import Banner from '../../components/Banner/Banner'
import { useGetPageQuery } from '../../generated/graphql'
import Container from '../../components/Container/Container'
import List from '../../components/List/List'
import styles from '../../styles/pages.module.css'

const SectionPage = () => {
  const router = useRouter()

  const pageName = router.query.page as string

  const { data, error, loading } = useGetPageQuery({
    variables: {
      name: pageName,
    },
  })

  if (error) console.log(error.message)
  if (!data && !loading)
    return (
      <div className={styles.message}>
        <h3>No articles... 🤔</h3>
      </div>
    )

  const pageAndArticlesArray = data?.Page?.articles

  return (
    <>
      <Banner name={data?.Page?.name} />
      <Container>
        <>{pageAndArticlesArray && <List articles={pageAndArticlesArray} />}</>
      </Container>
    </>
  )
}

export default SectionPage
