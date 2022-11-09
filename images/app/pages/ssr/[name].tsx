import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import SSRImageComponent from '../../components/SSRImageComponent'

export default function SSRImage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSR image</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <SSRImageComponent />
      </main>
    </div>
  )
}
