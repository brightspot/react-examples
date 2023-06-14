import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import { ParsedUrlQuery } from 'querystring'
import {
  BlogPost,
  GetAllPathsDocument,
  GetBlogPostDocument,
} from '../generated/graphql'
import { client } from '../lib/client'
import styles from '../styles/Home.module.css'

interface Props {
  blogPost?: BlogPost
}

const Content: NextPage<Props> = ({ blogPost }) => {
  if (blogPost) {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <h1>BLÖG</h1>
          <div className={styles.title}>{blogPost.title}</div>
          <p className={styles.description}>{blogPost.body}</p>
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

  data.AllBlogPosts.blogPosts.forEach((blogPost: BlogPost) => {
    blogPost.paths?.forEach((path) => {
      if (path?.type === 'Permalink') {
        paths.push({ params: { path: path?.path?.split('/') } })
      }
    })
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
    query: GetBlogPostDocument,
    variables: {
      path,
    },
  })

  if (data.BlogPost) {
    return {
      props: { blogPost: data.BlogPost },
    }
  }

  return {
    notFound: true,
  }
}
