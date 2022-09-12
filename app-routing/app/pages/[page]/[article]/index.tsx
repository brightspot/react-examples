import { useRouter } from 'next/router'
import { useGetArticleQuery } from '../../../generated/graphql'
import Container from '../../../components/Container'
import Article from '../../../components/Article'
import styles from '../../../styles/pages.module.css'

const ArticlePage = () => {
  const router = useRouter()

  const article = router.query.article as string
  const { data, error, loading } = useGetArticleQuery({
    variables: {
      headline: article,
    },
  })

  if (error) console.log(error.message)
  if (!data && !loading)
    return (
      <div className={styles.message}>
        <h3>No article... 🤔</h3>
      </div>
    )

  return (
    <>
      <Container>
        <Article
          headline={data?.Article?.headline}
          body={data?.Article?.body}
          publishDate={data?.Article?.publishDate}
        />
      </Container>
    </>
  )
}

export default ArticlePage
