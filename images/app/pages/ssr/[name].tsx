import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import SSRImageComponent from '../../components/SSRImageComponent'

import Link from 'next/link'

export default function SSRImage() {
  const router = useRouter()
  console.log({ router })
  return (
    <div className={styles.container}>
      <Head>
        <title>CSR image</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <SSRImageComponent />
      </main>
    </div>
  )
}
