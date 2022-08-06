import type { NextPage } from 'next'
import styles from './Article.module.css'

interface Props {
  headline: string | null | undefined
  body: string | null | undefined
  publishDate: string | null | undefined
}

const Article: NextPage<Props> = ({ headline, body, publishDate }: Props) => {
  return (
    <div className={styles.card}>
      <h1 className={styles.articleHeadline}>{headline}</h1>
      <p className={styles.datePublished}>{publishDate}</p>
      <p className={styles.articleBody}>{body}</p>
    </div>
  )
}

export default Article
