import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ClientOnly from '../components/ClientOnly'
import ImagesComponent from '../components/ImagesComponent'

export default function ClientSide() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CSR Images</title>
        <meta name="description" content="CSR Images powered by Brightspot" />
        <link rel="icon" href="https://www.brightspot.com/favicon-32x32.png" />
      </Head>
      <ClientOnly>
        <ImagesComponent />
      </ClientOnly>
    </div>
  )
}
