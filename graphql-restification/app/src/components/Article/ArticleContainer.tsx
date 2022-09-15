import React, { useState, useEffect } from 'react'

import { Article } from '../../generated'
import { GET_HELLO, POST_BRIGHTSPOT } from '../../api/api'
import ArticleComponent from './Article'

interface ContainerData {
  article?: Article | undefined
  isClicked?: boolean | undefined
  errors?: string[]
}

const ArticleContainer = () => {
  const [data, setData] = useState<ContainerData>()

  const getHelloWorldArticle = async () => {
    const response: ContainerData = await GET_HELLO()
    return response
  }

  const getArticle = async (input: string | null) => {
    if (input) {
      POST_BRIGHTSPOT(input)
        .then((res) => handleResponse(res, !data?.isClicked))
        .catch((error: Error) => handleError(error))
    } else {
      GET_HELLO()
        .then((res) => handleResponse(res))
        .catch((error: Error) => handleError(error))
    }
  }

  const handleResponse = (res: any, isClicked: boolean = false): void => {
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
      isClicked,
      errors,
    })
  }

  const handleError = (error: Error): void => {
    setData({ errors: [error.message] })
  }

  let timeoutId: ReturnType<typeof setTimeout>
  const debounce = (fn: Function, ms = 300) => {
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
  }

  const handleOnChange = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    return debounce(() => getArticle(e?.target?.value), 1000)()
  }

  useEffect(() => {
    getHelloWorldArticle()
      .then((res) => handleResponse(res))
      .catch((error: Error) => handleError(error))
  }, [])

  return (
    <>
      <div className="article-container">
        <ArticleComponent article={data?.article} />
      </div>
      {data?.errors?.map((error, i) => (
        <p className="error" key={i}>
          {error}
        </p>
      ))}
      <div className="input-wrapper">
        <label htmlFor="path">Enter Article:</label>
        <input required name="path" onChange={handleOnChange} />
      </div>
    </>
  )
}

export default ArticleContainer
