import { useState, useEffect } from 'react'

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

  const getArticle = async () => {
    if (!data?.isClicked) {
      POST_BRIGHTSPOT()
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
    setData({
      article,
      isClicked,
      errors,
    })
  }

  const handleError = (error: Error): void => {
    setData({ errors: [error.message] })
  }

  useEffect(() => {
    getHelloWorldArticle()
      .then((res) => handleResponse(res))
      .catch((error: Error) => handleError(error))
  }, [])

  return (
    <>
      <div className="hello-world-container">
        <ArticleComponent article={data?.article} />
      </div>
      {data?.errors?.map((error, i) => (
        <p className="error" key={i}>
          {error}
        </p>
      ))}
      <button className="brightspot-button" onClick={getArticle}>
        {' '}
        {data?.isClicked ? 'Welcome Message' : 'Brightspot'}{' '}
      </button>
    </>
  )
}

export default ArticleContainer
