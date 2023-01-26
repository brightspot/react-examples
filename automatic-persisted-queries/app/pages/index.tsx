import type { NextPage, GetServerSideProps } from 'next'
import styles from '../styles/Home.module.css'

type Props = {
  data: string
}

const Home: NextPage<Props> = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>{data}</h1>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      data: 'automatic persisted queries',
    },
  }
}

export default Home
