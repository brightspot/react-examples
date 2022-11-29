import { gql } from '@apollo/client'
import type { NextPage, GetServerSideProps } from 'next'
import { client } from '../lib/client'
import styles from '../styles/Home.module.css'

const GetAllFunFactsQuery = gql`
  query AllFunFacts {
    AllFunFacts {
      funFacts {
        text
      }
    }
  }
`

interface Props {
  data?: {
    AllFunFacts?: {
      funFacts?: { text: string }[]
    }
  }
  errors?: any
}

const Home: NextPage<Props> = ({ data, errors }) => {
  if (errors) {
    return (
      <pre>
        <code>{JSON.stringify(errors, null, 4)}</code>
      </pre>
    )
  }

  if (data?.AllFunFacts?.funFacts?.length === 0) {
    return (
      <div className={styles.main}>
        <h1 className={styles.title}>Nothing Here 🧐</h1>
        <p className={styles.description}>
          Publish a &apos;Fun Fact&apos; in{' '}
          <a href="http://localhost/cms" target="_blank" rel="noreferrer">
            Brightspot
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>Fun Facts</h1>
        <div className={styles.grid}>
          {data?.AllFunFacts?.funFacts?.map((funFact, index) => (
            <div className={styles.card} key={index}>
              <h2 className={styles.title}>Did You Know...?</h2>
              <p className={styles.description}>{funFact.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await client.query({
      query: GetAllFunFactsQuery,
    })

    return {
      props: {
        data,
      },
    }
  } catch (errors: any) {
    const props = {
      errors: {
        graphQLErrors: errors.graphQLErrors,
        networkError: errors.networkError?.statusCode
          ? {
              statusCode: errors.networkError.statusCode,
            }
          : {},
      },
    }

    return { props }
  }
}

export default Home
