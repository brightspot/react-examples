import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Images by Brightspot</title>
      </Head>
      <div className={styles.homePageContainer}>
        <h2 className={styles.topText}>
          <Link className={styles.link} href="/csr">
            Client-side
          </Link>
        </h2>
        <div className={styles.bottomTextContainer}>
          <h2 className={styles.bottomText}>
            <Link className={styles.link} href="/ssr">
              Server-side
            </Link>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Home
