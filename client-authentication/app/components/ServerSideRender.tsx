import type { NextPage } from 'next'

import styles from '../styles/Home.module.css'

import EmptyList from './EmptyList'

interface Props {
  data?: {
    AllFunFacts?: {
      funFacts?: {
        text: string
        path: string
      }[]
    }
  }
  errors?: any
}

const ServerSideRender: NextPage<Props> = ({ data, errors }) => {
  if (errors) {
    return (
      <pre>
        <code>{JSON.stringify(errors[0].message)}</code>
      </pre>
    )
  }

  if (data?.AllFunFacts?.funFacts?.length === 0) {
    return <EmptyList renderMode="Server Side Render" />
  }

  const carouselSlides = data?.AllFunFacts?.funFacts?.map((funFact, index) => (
    <div className={styles.card} id={`ssr-slide-${index + 1}`} key={index}>
      <h2 className={styles.title}>Did You Know...?</h2>
      <p className={styles.description}>{funFact.text}</p>
    </div>
  ))

  const carouselButtons = data?.AllFunFacts?.funFacts?.map((funFact, index) => (
    <a href={`#ssr-slide-${index + 1}`} key={index + 1}>
      {index + 1}
    </a>
  ))

  return (
    <div className={styles.container}>
      <h3>Server Side Render</h3>
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

export default ServerSideRender
