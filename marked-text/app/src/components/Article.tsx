import { useState, useEffect, useCallback, Fragment, ReactNode } from 'react'
import {
  HtmlElement,
  MarkedText,
  markedTextTraversal,
} from '@brightspot/marked-text'
import React from 'react'
interface ArticleData {
  headline: string
  body: MarkedText | undefined
}
interface ArticleResponse {
  articleData?: ArticleData
  errors?: string[]
}

const ArticleMarkQuery = `
query ArticleMarkedTextQuery {
  Article {
    headline
    body {
      text
      marks {
        start
        end
        descendants
        data {
          ... on RteHtmlElement {
            __typename
            name
          }
        }
      }
    }
  }
}
`

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

  let key = 0

  return (
    <div className="marked-text-container Article">
      <h1 className="headline">{article?.articleData?.headline}</h1>
      {markedTextTraversal(article?.articleData?.body, {
        visitText: (text: string) => <Fragment key={key++}>{text}</Fragment>,
        visitMark: (mark: any, children: ReactNode[]) => {
          const element = mark.data as HtmlElement

          return React.createElement(
            element.name,
            { key: `k-${key++}` },
            children
          )
        },
      })}
    </div>
  )
}

export default Article
