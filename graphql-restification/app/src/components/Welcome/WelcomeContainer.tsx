import { useState, useEffect } from 'react'

import { Article } from '../../generated/graphql'
import { GET_HELLO, POST_BRIGHTSPOT } from '../../api/api'
import Welcome from './Welcome'

interface ContainerData {
  article?: Article | undefined
  isClicked?: boolean | undefined
  errors?: string[]
}

const WelcomeContainer = () => {
  const [data, setData] = useState<ContainerData>()

  const fetchHelloWorld = async () => {
    const response: ContainerData = await GET_HELLO()
    if (response.errors === undefined || response.errors.length > 0) {
      setData({ errors: response.errors, isClicked: true })
    } else {
      setData({ article: response.article, isClicked: true })
    }
  }

  const fetchBrightspotMessage = async () => {
    if (data?.isClicked) {
      const response: ContainerData = await POST_BRIGHTSPOT(data?.isClicked)
      setBrightspotMessage(response)
    } else {
      const response: ContainerData = await GET_HELLO()
      setBrightspotMessage(response)
    }
  }

  const setBrightspotMessage = (response: ContainerData) => {
    if (response.errors === undefined || response.errors.length > 0) {
      setData({ ...data, errors: response.errors, isClicked: !data?.isClicked })
    } else {
      setData({ article: response.article, isClicked: !data?.isClicked })
    }
  }

  useEffect(() => {
    fetchHelloWorld()
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
      <button className="brightspot-button" onClick={fetchBrightspotMessage}>
        {' '}
        {data?.isClicked ? 'Welcome Message' : 'Brightspot'}{' '}
      </button>
    </>
  )
}

export default WelcomeContainer
