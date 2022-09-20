import { Article } from '../generated'
import { GET_HELLO_WITH_PARAMS, POST_ARTICLE } from '../api/api'

let timeoutId: ReturnType<typeof setTimeout>
const debounce = (fn: Function, ms = 300) => {
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

const getArticle = async (input: string | null, setData: Function) => {
  if (input) {
    GET_HELLO_WITH_PARAMS(input)
      .then((res) => handleResponse(res, setData))
      .catch((error: Error) => handleError(error, setData))
  }
}

const postArticle = async (input: string | null, setData: Function) => {
  if (input) {
    POST_ARTICLE(input)
      .then((res) => handleResponse(res, setData))
      .catch((error: Error) => handleError(error, setData))
  }
}

const handleResponse = (res: any, setData: Function): void => {
  let article: Article | undefined
  let errors: string[] = []

  if (res?.data?.Article) {
    article = {
      headline: res.data.Article.headline,
      subheadline: res.data.Article.subheadline,
    }
  }
  if (res.errors) {
    for (let error of res.errors) {
      errors.push(error.message)
    }
  }

  article =
    res?.data?.Article !== null
      ? article
      : (article = {
          headline: 'Article not found',
          subheadline: 'No article matches the path entered',
        })
  setData({
    article,
    errors,
  })
}

const handleError = (error: Error, setData: Function): void => {
  setData({ errors: [error.message] })
}

export { debounce, getArticle, postArticle, handleResponse, handleError }
