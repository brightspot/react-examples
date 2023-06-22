import type { GetServerSideProps, NextPage } from 'next'

import styles from '../styles/Home.module.css'

import ClientSideRender from '../components/ClientSideRender'
import ServerSideRender from '../components/ServerSideRender'

interface Props {
  data?: {
    AllFunFacts?: {
      funFacts?: {
        text: string
        path: string
      }[]
    }
  }
  errors?: any
}

const getAllFunFactsQuery = `
query GetAllFunFactsQuery {
  AllFunFacts {
    funFacts {
      text
    }
  }
}
`

const Home: NextPage<Props> = ({ data, errors }) => {
  return (
    <div className={styles.split}>
      <ClientSideRender />
      <ServerSideRender data={data} errors={errors} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.GRAPHQL_URL}`, {
    method: 'POST',
    headers: {
      'X-Client-Id': process.env.GRAPHQL_CLIENT_ID ?? '',
      'X-Client-Secret': process.env.GRAPHQL_CLIENT_API_KEY ?? '',
      // Secret key is hidden behind proxy server
    },
    body: JSON.stringify({
      query: getAllFunFactsQuery,
    }),
  })

  const data = await res.json()

  return { props: data }
}

export default Home
