import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Banner from '../../components/Banner/Banner'
import { useGetPageQuery } from '../../generated/graphql'
import Container from '../../components/Container/Container'
import List from '../../components/List/List'
import styles from '../../styles/pages.module.css'

const SectionPage = () => {
  const [shouldSkip, setShouldSkip] = useState(true)
  const [isSSSR, setIsSSR] = useState(false) // make sure sessionStorage is available
  const router = useRouter()

  useEffect(() => {
    setIsSSR(true)
  }, [])

  let queryId = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id

  if (queryId && isSSSR) {
    if (Array.isArray(queryId)) {
      sessionStorage.setItem('page', queryId[0])
    } else if (typeof queryId === 'string') {
      sessionStorage.setItem('page', queryId)
    }
  }
  if (queryId === undefined && isSSSR) {
    queryId = sessionStorage.getItem('page') as string
  }

  useEffect(() => {
    if (router.isReady) {
      setShouldSkip(false)
    }
  }, [router.isReady])

  const { data, error, loading } = useGetPageQuery({
    variables: {
      id: queryId,
    },
    skip: shouldSkip,
  })

  if (error) console.log(error.message)
  if (!data && !loading)
    return (
      <div className={styles.message}>
        <h3>No articles... 🤔</h3>
      </div>
    )

  const pagesAndArticlesArray = data?.Page?.Article_page_connection?.items

  return (
    <>
      <Banner
        name={pagesAndArticlesArray ? pagesAndArticlesArray[0]?.page?.name : ''}
      />
      <Container>
        <>
          <List articles={pagesAndArticlesArray} />
        </>
      </Container>
    </>
  )
}

export default SectionPage
