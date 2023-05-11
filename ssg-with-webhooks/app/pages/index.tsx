import type { GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import { AllSections, GetAllSectionsDocument } from '../generated/graphql'
import { client } from '../lib/client'
import styles from '../styles/Home.module.css'

interface Props {
  AllSections?: AllSections
}

const Home: NextPage<Props> = ({ AllSections }) => {
  if (!AllSections) return <Error statusCode={404} />
  return (
    <div className={styles.container}>
      <h1>Home Page</h1>
      <h2>Sections:</h2>
      <div>
        {AllSections.sections?.map((section, index) => (
          <div key={index}>
            <a href={`${process.env.NEXT_PUBLIC_HOST}${section?.path}`}>
              {section?.path}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await client.query({
    query: GetAllSectionsDocument,
  })

  return {
    props: { AllSections: data.AllSections },
  }
}
