import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useGetArticleQuery } from '../../../generated/graphql'
import Container from '../../../components/Container/Container'
import Article from '../../../components/Article/Article'

const ArticlePage = () => {
  const [shouldSkip, setShouldSkip] = useState(true)
  const [isSSSR, setIsSSR] = useState(false) // make sure sessionStorage is available
  const router = useRouter()

  useEffect(() => {
    setIsSSR(true)
  }, [])

  let id = router.query.article

  if (id && isSSSR) {
    if (Array.isArray(id)) {
      sessionStorage.setItem('article', id[0])
    } else if (typeof id === 'string') {
      sessionStorage.setItem('article', id)
    }
  }
  if (id === undefined && isSSSR) {
    id = sessionStorage.getItem('article') as string
  }

  useEffect(() => {
    if (router.isReady) {
      setShouldSkip(false)
    }
  }, [router.isReady])

  const articleId = Array.isArray(id) ? id[0] : id
  const { data, error } = useGetArticleQuery({
    variables: {
      id: articleId,
    },
    skip: shouldSkip,
  })

  if (error) console.log(error.message)

  const toDateTime = (secs: number) => {
    const t = new Date(secs * 1000)
    return t.toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
  }

  const publishDate = toDateTime(data?.Article?.cms_content?.publishDate)

  return (
    <>
      <Container>
        <Article
          headline={data?.Article?.headline}
          body={data?.Article?.body}
          publishDate={publishDate}
        />
      </Container>
    </>
  )
}

export default ArticlePage
