import { MarkedText } from '@brightspot/marked-text'
import { ArticleMarkQuery } from '../components/Article/ArticleMarkQuery'
interface ArticleData {
  headline: string
  body: MarkedText
}

export interface ArticleResponse {
  articleData?: ArticleData
  errors?: string[]
}

const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL ?? ''

const dataRequestParams = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: ArticleMarkQuery,
  }),
}

export const fetchArticle = async (
  setArticle: React.Dispatch<React.SetStateAction<ArticleResponse | undefined>>
) =>
  await fetch(GRAPHQL_URL, dataRequestParams)
    .then((res) => res.json())
    .then((res) => handleResponse(res, setArticle))
    .catch((error: Error) => handleError(error, setArticle))

const handleResponse = (
  res: any,
  setArticle: React.Dispatch<React.SetStateAction<ArticleResponse | undefined>>
) => {
  let articleData: ArticleData | undefined
  let errors: string[] = []
  if (res?.data?.Article) {
    articleData = {
      headline: res.data.Article.headline,
      body: res.data.Article.body,
    }
  }
  if (res.errors) res.errors.forEach((error: any) => errors.push(error.message))
  setArticle({
    articleData,
    errors: errors,
  })
}

const handleError = (
  error: Error,
  setArticle: React.Dispatch<React.SetStateAction<ArticleResponse | undefined>>
) => {
  setArticle({
    errors: [error.message],
  })
}
