import type { GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import { AllBlogPosts, GetAllBlogPostsDocument } from '../generated/graphql'
import { client } from '../lib/client'
import { findPermalink } from '../lib/utils'
import styles from '../styles/Home.module.css'

interface Props {
  AllBlogPosts?: AllBlogPosts
}

const Home: NextPage<Props> = ({ AllBlogPosts }) => {
  if (!AllBlogPosts) return <Error statusCode={404} />
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>BLÖG</h1>
        <div className={styles.grid}>
          {AllBlogPosts.blogPosts?.map((blogPost, index) => (
            <a key={index} href={`${findPermalink(blogPost?.paths)}`}>
              <div key={index} className={styles.card}>
                <p>{blogPost?.title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await client.query({
    query: GetAllBlogPostsDocument,
  })

  return {
    props: { AllBlogPosts: data.AllBlogPosts },
  }
}
