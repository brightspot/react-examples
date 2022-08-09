import type { NextPage } from 'next'
import styles from './Article.module.css'
import { Article } from '../../generated/graphql'

interface Props {
  article: Article
}

const ArticleView: NextPage<Props> = ({ article }) => {
  return (
    <div className={styles.articleWrapper}>
      <h1 className={styles.articleHeadline}>{article.headline}</h1>
      <p className={styles.datePublished}>
        {new Date(article.cms_content?.publishDate).toLocaleString()}
      </p>
      <p className={styles.articleBody}>{article.body}</p>
    </div>
  )
}

export default ArticleView
