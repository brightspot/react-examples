import type { NextPage } from 'next'
import styles from './Duo.module.css'
import { Article } from '../../generated/graphql'
import Image from 'next/image'

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
  articles: Array<Article>
}

const DuoView: NextPage<Props> = ({ articles }) => {
  return (
    <section>
      <div className={styles.listGrid}>
        {articles?.map((article, index) => (
          <a
            key={index}
            href={`${process.env.NEXT_PUBLIC_HOST}${article.page?.url}${article.url}`}
          >
            <div className={styles.listItem}>
              <div className={styles.imageContainer}>
                <Image
                  src={imageArray[index].image}
                  alt={imageArray[index].alt}
                  layout='fill'
                />
              </div>
              <div className={styles.textContainer}>
                <p className={styles.sectionText}>{article.page?.name}</p>
                <h2 className={styles.articleHeadline}>{article.headline}</h2>
                <p>{article.body?.slice(0, 100)}...</p>
                READ MORE...
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default DuoView
