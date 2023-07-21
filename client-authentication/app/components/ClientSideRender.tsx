import type { NextPage } from 'next'
import { useState } from 'react'

import styles from '../styles/Home.module.css'

import EmptyList from './EmptyList'

interface Data {
  AllFunFacts?: {
    funFacts?: {
      text: string
      path: string
    }[]
  }
}

const getAllFunFactsQuery = `
query GetAllFunFactsQuery {
  AllFunFacts {
    funFacts {
      text
    }
  }
}
`

const ClientSideRender: NextPage = () => {
  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ isError: false, message: '' })

  const handleClick = () => {
    setLoading(true)

    fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}`, {
      method: 'POST',
      headers: {
        'X-Client-Id': process.env.NEXT_PUBLIC_GRAPHQL_CLIENT_ID ?? '',
        'X-Client-Secret': process.env.NEXT_PUBLIC_GRAPHQL_CLIENT_API_KEY ?? '',
        // WARNING: Secret key is exposed in web browser
      },
      body: JSON.stringify({
        query: getAllFunFactsQuery,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          setError({
            isError: true,
            message: res.errors[0].message,
          })
        }
        setData(res.data)
        setLoading(false)
      })
  }

  if (!(loading || data || error.isError)) {
    return (
      <div className={styles.container}>
        <h3>Client Side Render</h3>
        <div className={styles.main}>
          <button className={styles.loadButton} onClick={() => handleClick()}>
            Load Fun Facts
          </button>
        </div>
      </div>
    )
  }
  if (loading) return <div>Loading...</div>
  if (error.isError) {
    return (
      <pre>
        <code>{JSON.stringify(error.message)}</code>
      </pre>
    )
  }
  if (data?.AllFunFacts?.funFacts?.length === 0) {
    return <EmptyList renderMode="Client Side Render" />
  }

  const carouselSlides = data?.AllFunFacts?.funFacts?.map((funFact, index) => (
    <div className={styles.card} id={`csr-slide-${index + 1}`} key={index}>
      <h2 className={styles.title}>Did You Know...?</h2>
      <p className={styles.description}>{funFact.text}</p>
    </div>
  ))

  const carouselButtons = data?.AllFunFacts?.funFacts?.map((funFact, index) => (
    <a href={`#csr-slide-${index + 1}`} key={index + 1}>
      {index + 1}
    </a>
  ))

  return (
    <div className={styles.container}>
      <h3>Client Side Render</h3>
      <div className={styles.main}>
        <h1 className={styles.title}>Fun Facts</h1>
        <div className={styles.carousel}>
          <div className={styles.slides}>{carouselSlides}</div>
          {carouselButtons}
        </div>
      </div>
    </div>
  )
}

export default ClientSideRender
