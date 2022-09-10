import styles from './List.module.css'
import Link from 'next/link'
import { PartialArticle } from '../../pages/index'

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
  articles?: PartialArticle[]
}

const List = ({ articles }: Props) => {
  return (
    <section className={styles.listSection}>
      <div className={styles.listGrid}>
        {articles?.map((article: PartialArticle, i: number) => {
          return (
            <Link key={i} href={`/${article?.pageName}/${article?.headline}`}>
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
                    {article?.pageName && (
                      <p className={styles.sectionText}>{article?.pageName}</p>
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
