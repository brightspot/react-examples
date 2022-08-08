import styles from './Promo.module.css'
import { Article } from '../../generated/graphql'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  article: Article
}

const Promo = ({ article }: Props) => {
  return (
    <section className={styles.promoSection}>
      {article && (
        <Link
          href={`/${article?.page?.name}/${article?.headline}?article=${article?._id}`}
          as={`/${article?.page?.name}/${article?.headline}`}
        >
          <div className={styles.promoContainer}>
            <div className={styles.leftItem}>
              <div className={styles.textContainer}>
                <p className={styles.sectionText}>{article?.page?.name}</p>
                <h3 className={styles.articleHeadline}>{article?.headline}</h3>
                <p className={styles.articleBodyStarting}>READ MORE...</p>
              </div>
            </div>
            <div className={styles.rightItem}>
              <Image
                src={'/pug.jpg'}
                alt={'photo by Matthew Henry from Burst by Shopify'}
                height={500}
                width={700}
                layout='responsive'
              />
            </div>
          </div>
        </Link>
      )}
    </section>
  )
}

export default Promo
