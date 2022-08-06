import type { NextPage } from 'next'
import styles from './Duo.module.css'
import { Article } from '../../generated/graphql'
import Image from 'next/image'
import Link from 'next/link'

const imageArray = [
  { image: '/bluecat.png', alt: 'photo by Sarah Pflug on Burst by Shopify' },
  { image: '/cat.png', alt: 'photo by Sarah Pflug on Burst by Shopify' },
]

interface Props {
  articles: Array<Article>
}

const Duo: NextPage<Props> = ({ articles }) => {
  return (
    <section className={styles.section}>
      <div className={styles.listGrid}>
        {articles?.map((article, index) => (
          <Link
            href={`/${article?.page?.name}/${article?.headline}?article=${article?._id}`}
            as={`/${article?.page?.name}/${article?.headline}`}
            key={index}
          >
            <a>
              <div className={styles.listItem}>
                <div className={styles.imageContainer}>
                  <Image
                    src={imageArray[index].image}
                    alt={imageArray[index].alt}
                    objectFit='cover'
                    layout='fill'
                    priority
                  />
                </div>
                <div className={styles.textContainer}>
                  <p className={styles.sectionText}>{article?.page?.name}</p>
                  <h2 className={styles.articleHeadline}>
                    {article?.headline}
                  </h2>
                  READ MORE...
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Duo
