import { useRouter } from 'next/router'
import Banner from '../../components/Banner'
import { useGetPageQuery } from '../../generated/graphql'
import Container from '../../components/Container'
import CardList from '../../components/CardList'
import styles from '../../styles/pages.module.css'

const SectionPage = () => {
  const router = useRouter()
  const page = router.query.page as string

  const { data, error, loading } = useGetPageQuery({
    variables: {
      slug: page,
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
        <>
          {data?.Page?.articles && <CardList articles={data?.Page?.articles} />}
        </>
      </Container>
    </>
  )
}

export default SectionPage
