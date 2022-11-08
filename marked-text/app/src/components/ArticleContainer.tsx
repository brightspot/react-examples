import { useState, useEffect, useCallback } from 'react'
import { ArticleMarkQuery } from './ArticleMarkQuery'
import { RteMark, RteMarkedText } from '../brightspot-marked-text/types'
import { markedTextTraversal } from '../brightspot-marked-text/marked-text'
import {
  TextComponent,
  RenderedComponent,
  TypeComponentHandler,
} from './StyledComponents'

interface ArticleData {
  headline: string
  subheadline: string
  body: RteMarkedText
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

  const textHandler = (text: string) => {
    return <TextComponent text={text} />
  }

  const componentHandler = (
    mark: RteMark,
    children: Array<React.ReactElement>
  ) => TypeComponentHandler(mark, children)

  return (
    <div>
      <h1>{article?.articleData?.headline}</h1>
      <h2>{article?.articleData?.subheadline}</h2>
      {article?.articleData &&
        markedTextTraversal(article?.articleData?.body, {
          visitText: textHandler,
          visitMark: componentHandler,
        }).map((Component, index: number) => {
          return <RenderedComponent key={index} Component={Component} />
        })}
    </div>
  )
}

export default ArticleContainer
