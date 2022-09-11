import styles from './List.module.css'
import Link from 'next/link'
import { Article } from '../../generated/graphql'

type PartArticle = Omit<Article, 'body'> | null

type Props = {
  articles: PartArticle[]
}

const List = ({ articles }: Props) => {
  return (
    <section className={styles.listSection}>
      <div className={styles.listGrid}>
        {articles?.map((article: PartArticle, i: number) => {
          return (
            <Link key={i} href={`/${article?.page?.name}/${article?.headline}`}>
              <a>
                <div className={styles.listItem}>
                  {article?.page?.name && (
                    <p className={styles.pageName}>{article.page.name}</p>
                  )}
                  <h2 className={styles.articleHeadline}>
                    {article?.headline}
                  </h2>
                </div>
              </a>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default List
