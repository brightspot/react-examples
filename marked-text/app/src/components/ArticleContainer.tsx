import { useState, useEffect, useCallback } from 'react'
import { ArticleMarkQuery } from './ArticleMarkQuery'
import { Mark, MarkedText } from '../brightspot-marked-text/types'
import { markedText } from '../brightspot-marked-text/marked-text'
import {
  ParagraphComponent,
  LineBreakComponent,
  StrongComponent,
  ItalicComponent,
  UnderlineComponent,
  SubScriptComponent,
  SuperScriptComponent,
  StrikethroughComponent,
  OLComponent,
  ULComponent,
  LiComponent,
} from './StyledComponents'

interface ArticleData {
  headline: string
  subheadline: string
  body: MarkedText
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

  const componentHandler = (
    mark: Mark | null,
    children: Array<String | React.ReactElement>
  ) => {
    if (mark === null) return ''
    const { name, start, end } = mark
    if (name === 'p') {
      return (
        <ParagraphComponent
          key={`${name}-${start}-${end}`}
          children={children}
        />
      )
    }
    if (name === 'br') {
      return <LineBreakComponent key={`${name}-${start}-${end}`} />
    }
    if (name === 'b') {
      return (
        <StrongComponent key={`${name}-${start}-${end}`} children={children} />
      )
    }
    if (name === 'i') {
      return (
        <ItalicComponent key={`${name}-${start}-${end}`} children={children} />
      )
    }
    if (name === 'u') {
      return (
        <UnderlineComponent
          key={`${name}-${start}-${end}`}
          children={children}
        />
      )
    }
    if (name === 's') {
      return (
        <StrikethroughComponent
          key={`${name}-${start}-${end}`}
          children={children}
        />
      )
    }
    if (name === 'sub') {
      return (
        <SubScriptComponent
          key={`${name}-${start}-${end}`}
          children={children}
        />
      )
    }
    if (name === 'sup') {
      return (
        <SuperScriptComponent
          key={`${name}-${start}-${end}`}
          children={children}
        />
      )
    }
    if (name === 'ol') {
      return <OLComponent key={`${name}-${start}-${end}`} children={children} />
    }
    if (name === 'ul') {
      return <ULComponent key={`${name}-${start}-${end}`} children={children} />
    }
    if (name === 'li') {
      return <LiComponent key={`${name}-${start}-${end}`} children={children} />
    }
  }

  if (article?.articleData)
    markedText(article?.articleData?.body, componentHandler)
  return (
    <div>
      <h1>{article?.articleData?.headline}</h1>
      <h2>{article?.articleData?.subheadline}</h2>
      {/* hey api, here is api, here is the marked text, return it */}
      {article?.articleData &&
        markedText(article?.articleData?.body, componentHandler).map(
          (Component: React.ReactElement, index: number) => {
            return Component
          }
        )}
    </div>
  )
}

export default ArticleContainer
