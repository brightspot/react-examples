import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import { ParsedUrlQuery } from 'querystring'
import {
  Article,
  GetAllPathsDocument,
  GetContentDocument,
  Section,
} from '../generated/graphql'
import { client } from '../lib/client'
import styles from '../styles/Home.module.css'

interface Props {
  article?: Article
  section?: Section
}

const Content: NextPage<Props> = ({ article, section }) => {
  if (article) {
    return (
      <div className={styles.container}>
        <a href={`${article.section?.path}`}>
          <h1>{article.section?.name}</h1>
        </a>
        <h2>Article Page</h2>
        <div>{article.headline}</div>
        <p>{article.body}</p>
      </div>
    )
  }

  if (section) {
    return (
      <div className={styles.container}>
        <h1>Section Page</h1>
        <h2>{section.name}</h2>
        <h3>Articles:</h3>
        <div>
          {section.articles?.map((article, index) => (
            <div key={index}>
              <a href={`${process.env.NEXT_PUBLIC_HOST}${article?.path}`}>
                {article?.path} - {article?.headline}
              </a>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return <Error statusCode={404} />
}

export default Content

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: GetAllPathsDocument,
  })

  let paths: { params: ParsedUrlQuery }[] = []

  data.AllArticles.articles.forEach((article: Article) => {
    article.directoryData?.paths?.forEach((path) =>
      paths.push({ params: { path: path?.path?.split('/') } })
    )
  })

  data.AllSections.sections.forEach((section: Section) => {
    section.directoryData?.paths?.forEach((path) =>
      paths.push({ params: { path: path?.path?.split('/') } })
    )
  })

  paths.forEach((path: any) => path.params.path.shift())

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  let subdirectories = context.params?.path as string[]
  let path = subdirectories.join('/')

  const { data } = await client.query({
    query: GetContentDocument,
    variables: {
      path,
    },
  })

  if (data.Section) {
    return {
      props: { section: data.Section },
    }
  }

  if (data.Article) {
    return {
      props: { article: data.Article },
    }
  }

  return {
    notFound: true,
  }
}
