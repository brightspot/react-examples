import styles from './Promo.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { PartialArticle } from '../../pages/index'

interface Props {
  article: PartialArticle
}

const Promo = ({ article }: Props) => {
  return (
    <section className={styles.promoSection}>
      {article && (
        <Link href={`/${article?.pageName}/${article?.headline}`}>
          <div className={styles.promoContainer}>
            <div className={styles.leftItem}>
              <div className={styles.textContainer}>
                <p className={styles.sectionText}>{article?.pageName}</p>
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
