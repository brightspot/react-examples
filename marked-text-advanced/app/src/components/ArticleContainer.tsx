import { useState, useEffect, useCallback } from 'react'
import { ArticleMarkQuery } from './ArticleMarkQuery'
import { Mark, MarkedText } from '../brightspot-marked-text/types'
import { markedTextTraversal } from '../brightspot-marked-text/index'
import TypeComponentHandler from './TypeComponentHandler'
import TextComponent from './TextComponent'
import ReactComponent from './ReactComponent'

interface ArticleData {
  headline: string
  subheadline: string
  body: MarkedText
}

interface ArticleResponse {
  articleData?: ArticleData
  errors?: string[]
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

  //Called when arriving at the text within a mark
  const textHandler = (text: string) => {
    return <TextComponent key={text} text={text} />
  }

  //Called once all the text within the mark has been checked/handled
  const componentHandler = (mark: Mark, children: Array<React.ReactElement>) =>
    TypeComponentHandler(mark, children)

  // Required object passed to markedTextTraversal
  const visitorHandler = {
    visitText: textHandler,
    visitMark: componentHandler,
  }

  return (
    <div className="marked-text-container">
      <h1 className="headline">{article?.articleData?.headline}</h1>
      <h2 className="subheadline">{article?.articleData?.subheadline}</h2>
      {article?.articleData &&
        markedTextTraversal(article?.articleData?.body, visitorHandler).map(
          (Component, index: number) => {
            return <ReactComponent key={index} Component={Component} />
          }
        )}
    </div>
  )
}

export default ArticleContainer
