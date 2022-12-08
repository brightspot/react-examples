import { useState, useEffect, useCallback } from 'react'
import { ArticleMarkQuery } from './ArticleMarkQuery'
import { MarkedText } from '../brightspot-marked-text/types'
import MarkedTextComponent from './MarkedTextComponent'
interface ArticleData {
  headline: string
  body: MarkedText
}
interface ArticleResponse {
  articleData?: ArticleData
  errors?: string[]
}
const Article = () => {
  const [article, setArticle] = useState<ArticleResponse>()
  const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL ?? ''
  const handleResponse = (res: any) => {
    let articleData: ArticleData | undefined
    let errors: string[] = []
    if (res?.data?.Article) {
      articleData = {
        headline: res.data.Article.headline,
        body: res.data.Article.body,
      }
    }
    if (res.errors)
      res.errors.forEach((error: any) => errors.push(error.message))
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
    <div className="marked-text-container Article">
      <h1 className="headline">{article?.articleData?.headline}</h1>
      {article?.articleData?.headline && (
        <MarkedTextComponent markedText={article.articleData.body} />
      )}
    </div>
  )
}
export default Article
