import styles from './List.module.css'
import Link from 'next/link'
import { Article } from '../../generated/graphql'

const colorArray = [
  '#2F8F9D',
  '#34BE82',
  '#3BACB6',
  '#2F86A6',
  '#82DBD8',
  '#B3E8E5',
  '#2FDD92',
  '#F2F013',
]

interface Props {
  articles?: Array<Article>
}

const List = ({ articles }: Props) => {
  return (
    <section className={styles.listSection}>
      <div className={styles.listGrid}>
        {articles?.map((article: Article, i: number) => {
          return (
            <Link
              key={i}
              href={`/${article?.page?.name}/${article?.headline}?article=${article?._id}`}
              as={`/${article?.page?.name}/${article?.headline}`}
            >
              <a>
                <div className={styles.listItem}>
                  <div className={styles.imageContainer}>
                    <div
                      className={styles.fakeImage}
                      style={{
                        backgroundColor: `${
                          colorArray[Math.floor(Math.random() * 7) + 1]
                        }`,
                      }}
                    >
                      <span>image</span>
                    </div>
                  </div>
                  <div className={styles.textContainer}>
                    {article?.page?.name && (
                      <p className={styles.sectionText}>
                        {article?.page?.name}
                      </p>
                    )}
                    <h4 className={styles.articleHeadline}>
                      {article?.headline}
                    </h4>
                  </div>
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
