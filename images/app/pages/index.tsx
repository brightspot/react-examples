import type { NextPage } from 'next'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Brightspot Images</h1>
      <p>
        <Link href="/csr">Client Side Rendering</Link>
      </p>
      <p>
        <Link href="/ssr">Server Side Rendering</Link>
      </p>
    </div>
  )
}

export default Home
