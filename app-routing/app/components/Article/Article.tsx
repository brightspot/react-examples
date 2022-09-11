import styles from './Article.module.css'

type Props = {
  headline: string | null | undefined
  body: string | null | undefined
  publishDate: string | null | undefined
}

const Article = ({ headline, body, publishDate }: Props) => {
  return (
    <div>
      <h1 className={styles.articleHeadline}>{headline}</h1>
      <p className={styles.datePublished}>{publishDate}</p>
      <p className={styles.articleBody}>{body}</p>
    </div>
  )
}

export default Article
