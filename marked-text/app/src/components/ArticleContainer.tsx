import { useState, useEffect, useCallback } from 'react'
import { ArticleMarkQuery } from './ArticleMarkQuery'

interface ArticleData {
  headline: string
  subheadline: string
  body: {
    text: string
    marks: Array<Marks>
  }
}

interface Marks {
  __typename: string
  name: string
  start: number
  end: number
  descendants: number
}

interface ArticleResponse {
  articleData?: ArticleData
  errors?: Array<string>
}

const ArticleContainer = () => {
  const [article, setArticle] = useState<ArticleResponse>()

  const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL ?? ''

  const handleResponse = (res: any) => {
    let articleData: ArticleData | undefined
    let errors: string[] = []
    if (res?.data?.Article) {
      articleData = {
        headline: res.data.Article.headline,
        subheadline: res.data.Article.subheadline,
        body: res.data.Article.body,
      }
    }
    if (res.errors) {
      for (let error of res.errors) {
        errors.push(error.message)
      }
    }
    setArticle({
      articleData,
      errors: errors,
    })
  }

  const handleError = (error: Error) => {
    setArticle({
      errors: [error.message],
    })
  }

  const fetchArticleData = useCallback(async () => {
    const dataRequestParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: ArticleMarkQuery,
        variables: {
          path: 'marked-text',
        },
      }),
    }

    await fetch(GRAPHQL_URL, dataRequestParams)
      .then((res) => res.json())
      .then((res) => handleResponse(res))
      .catch((error: Error) => handleError(error))
  }, [GRAPHQL_URL])

  useEffect(() => {
    fetchArticleData()
  }, [fetchArticleData])

  return (
    <div>
      <h1>{article?.articleData?.headline}</h1>
      <h2>{article?.articleData?.subheadline}</h2>
    </div>
  )
}

export default ArticleContainer
