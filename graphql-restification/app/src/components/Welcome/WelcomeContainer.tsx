import Welcome from './Welcome'
import WelcomeButton from './WelcomeButton'
import { useState, useEffect } from 'react'
import { Article } from '../../generated/graphql'

interface ContainerData {
  article?: Article | undefined
  isClicked?: boolean | undefined
  errors?: string[]
}

const WelcomeContainer = () => {
  const [data, setData] = useState<ContainerData>()

  const GET_HELLO = () =>
    fetch('http://localhost/articles/hello-world')
      .then((res) => res.json())
      .then((res) => handleResponse(res))
      .catch((error: Error) => handleError(error))

  const POST_BRIGHTSPOT = async () => {
    const formData = new FormData()
    formData.append('path', 'brightspot')
    return fetch('http://localhost/articles/brightspot', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => handleResponse(res))
      .catch((error: Error) => handleError(error))
  }

  const fetchBrightspotData = async () => {
    if (!data?.isClicked) {
      const response: ContainerData = await POST_BRIGHTSPOT()
      setData({ article: response.article, isClicked: !data?.isClicked })
    } else {
      const response: ContainerData = await GET_HELLO()
      setData({ article: response.article, isClicked: !data?.isClicked })
    }
  }

  const handleResponse = (res: any): ContainerData => {
    let article: Article | undefined
    let errors: string[] = []
    let isClicked = data?.isClicked

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
    return {
      article,
      isClicked,
      errors,
    }
  }

  const handleError = (error: Error) => {
    return { errors: [error.message] }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response: ContainerData = await GET_HELLO()
      response.errors === undefined || response.errors.length > 0
        ? setData({ ...data, errors: response.errors })
        : setData({ ...data, article: response.article })
    }
    fetchData()
  }, [])

  return (
    <>
      <div className="hello-world-container">
        <Welcome article={data?.article} />
      </div>
      {data?.errors?.map((error, i) => (
        <p className="error" key={i}>
          {error}
        </p>
      ))}
      <WelcomeButton
        fetchBrightspot={fetchBrightspotData}
        isClicked={data?.isClicked}
      />
    </>
  )
}

export default WelcomeContainer
