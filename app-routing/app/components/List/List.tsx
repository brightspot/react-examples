import styles from './List.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Article } from '../../generated/graphql'
import type { NextPage } from 'next'

const imageArray = [
  { image: '/balloons.png', alt: 'cropped photo by Al Soot on Unsplash' },
  {
    image: '/laugh.jpg',
    alt: 'cropped photo by Felicia Buitenwerf on Unsplash',
  },
  { image: '/flowers.png', alt: 'cropped photo by Henry Be on Unsplash' },
  { image: '/ocean.png', alt: 'cropped photo by Quino Al on Unsplash' },
]

interface Props {
  articles?: Array<Article>
}

const List: NextPage<Props> = ({ articles }) => {
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
                    <Image
                      src={imageArray[i].image}
                      alt={imageArray[i].alt}
                      layout='fill'
                      objectFit='cover'
                    />
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
