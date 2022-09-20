import { useState, useEffect } from 'react'

import { GET_HELLO } from '../../api/api'
import { handleResponse, handleError } from '../../utils/utils'
import { Article } from '../../generated'

interface HelloArticleData {
  article?: Article | undefined
  errors?: string[]
}

const HelloWorldArticle = () => {
  const [data, setData] = useState<HelloArticleData>()

  const getHelloWorldArticle = async () => await GET_HELLO()

  useEffect(() => {
    getHelloWorldArticle()
      .then((res) => handleResponse(res, setData))
      .catch((error: Error) => handleError(error, setData))
  }, [])

  return (
    <div className="article hello-world-article">
      This makes a GET Request
      <h1>{data?.article?.headline}</h1>
      <h2>{data?.article?.subheadline}</h2>
      {data?.errors?.map((error, i) => (
        <p className="error" key={i}>
          {error}
        </p>
      ))}
    </div>
  )
}

export default HelloWorldArticle
