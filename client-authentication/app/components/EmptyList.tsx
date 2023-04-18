import type { NextPage } from 'next'

import styles from '../styles/Home.module.css'

const EmptyList: NextPage<{ renderMode: string }> = ({ renderMode }) => (
  <div className={styles.container}>
    <h3>{renderMode}</h3>
    <div className={styles.main}>
      <h1 className={styles.title}>No Content Published 🧐</h1>
      <p className={styles.description}>
        Publish a &apos;Fun Fact&apos; in{' '}
        <a
          href={`${process.env.NEXT_PUBLIC_HOST}`}
          target="_blank"
          rel="noreferrer"
        >
          Brightspot
        </a>
      </p>
    </div>
  </div>
)

export default EmptyList
