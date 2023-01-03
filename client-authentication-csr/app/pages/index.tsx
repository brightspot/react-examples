import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { Data } from './api/funFacts'

import EmptyList from '../components/EmptyList'

const Home: NextPage = () => {
  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({ isError: false, message: '' })

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/funFacts`)
      .then((res) => {
        if (res.status >= 400) {
          setError({
            isError: true,
            message: `${res.status} - ${res.statusText}`,
          })
        }
        return res.json()
      })
      .then((res) => {
        setData(res)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading</div>
  if (error.isError) {
    return (
      <pre>
        <code>{JSON.stringify(error.message)}</code>
      </pre>
    )
  }
  if (data?.AllFunFacts?.funFacts?.length === 0) return <EmptyList />

  const carouselSlides = data?.AllFunFacts?.funFacts?.map((funFact, index) => (
    <div className={styles.card} id={`slide-${index + 1}`} key={index}>
      <h2 className={styles.title}>Did You Know...?</h2>
      <p className={styles.description}>{funFact.text}</p>
    </div>
  ))

  const carouselButtons = data?.AllFunFacts?.funFacts?.map((element, index) => (
    <a href={`#slide-${index + 1}`} key={index + 1}>
      {index + 1}
    </a>
  ))

  return (
    <div className={styles.container}>
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

export default Home
