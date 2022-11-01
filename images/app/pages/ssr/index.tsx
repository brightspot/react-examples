import Head from 'next/head'
import styles from '../../styles/Home.module.css'

export default function ServerSide() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSR images</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>All Server Side Rendered Images</h1>
      </main>
    </div>
  )
}
