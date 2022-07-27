import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import { Article } from '../../generated/graphql'

interface Props {
    article: Article
}

const ArticleView: NextPage<Props> = ({ article }) => {
  return (
    <div className={styles.card}>
      <h1>{article.headline}</h1>
      <p>{article.text}</p>
    </div>
  )
}

export default ArticleView
