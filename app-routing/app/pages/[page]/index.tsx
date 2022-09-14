import { useRouter } from 'next/router'
import Banner from '../../components/Banner'
import { useGetPageQuery } from '../../generated/graphql'
import Container from '../../components/Container'
import List from '../../components/List'
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

  return (
    <>
      <Banner name={data?.Page?.name} />
      <Container>
        <>{data?.Page?.articles && <List articles={data?.Page?.articles} />}</>
      </Container>
    </>
  )
}

export default SectionPage
