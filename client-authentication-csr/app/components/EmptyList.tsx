import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const EmptyList: NextPage = () => (
  <div className={styles.main}>
    <h1 className={styles.title}>No Content Published 🧐</h1>
    <p className={styles.description}>
      Publish a &apos;Fun Fact&apos; in{' '}
      <a href="http://localhost/cms" target="_blank" rel="noreferrer">
        Brightspot
      </a>
    </p>
  </div>
)

export default EmptyList
