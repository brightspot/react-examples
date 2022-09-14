import styles from './Duo.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Article } from '../../generated/graphql'

const imageArray = [
  { image: '/bluecat.png', alt: 'photo by Sarah Pflug on Burst by Shopify' },
  { image: '/cat.png', alt: 'photo by Sarah Pflug on Burst by Shopify' },
]

type PartArticle = Omit<Article, 'body'> | null

type Props = {
  articles: PartArticle[]
}

const Duo = ({ articles }: Props) => {
  return (
    <section className={styles.section}>
      <div className={styles.listGrid}>
        {articles?.map((article: PartArticle, index: number) => {
          return (
            <Link
              href={`/${article?.page?.name}/${article?.headline}`}
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
                    <p className={styles.pageName}>{article?.page?.name}</p>
                    <h2 className={styles.articleHeadline}>
                      {article?.headline}
                    </h2>
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

export default Duo
