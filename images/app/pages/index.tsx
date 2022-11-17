import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Images by Brightspot</title>
        <meta
          name="description"
          content="Images example powered by Brightspot"
        />
        <link rel="icon" href="https://www.brightspot.com/favicon-32x32.png" />
      </Head>
      <div className={styles.homePagContainer}>
        <h1 className={styles.mainTitle}>Brightspot Images</h1>
        <p>
          <Link className={styles.link} href="/csr">
            Client-side Rendering
          </Link>
        </p>
        <p>
          <Link className={styles.link} href="/ssr">
            Server-side Rendering
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Home
