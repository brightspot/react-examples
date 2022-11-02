import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import ClientOnly from '../../components/ClientOnly'
import ImageComponent from '../../components/ImageComponent'

export default function ClientSide() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CSR image</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ClientOnly>
          <ImageComponent />
        </ClientOnly>
      </main>
    </div>
  )
}
