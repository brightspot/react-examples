import type { NextPage } from 'next'
import Image from 'next/image'
import styles from './Section.module.css'
import { Page } from '../../generated/graphql'

const image = {
  src: '/ocean.png',
  alt: 'cropped photo by Quino Al on Unsplash',
}

interface Props {
  page: Page | undefined
}

const SectionComponent: NextPage<Props> = ({ page }) => {
  return (
    <section>
      <div>
        <a
          href={`${process.env.NEXT_PUBLIC_HOST}${page?.url}${page?.Article_page_connection?.items[0]?.url}`}
        >
          <div className={styles.listItem}>
            <div className={styles.sectionContainer}>
              <h3 className={styles.sectionText}>{page?.name}</h3>
            </div>
            <div className={styles.imageContainer}>
              <Image src={image.src} alt={image.alt} layout='fill' />
            </div>
            <div className={styles.textContainer}>
              <h4 className={styles.articleHeadline}>
                {page?.Article_page_connection?.items[0]?.headline}
              </h4>
              <p>
                {page?.Article_page_connection?.items[0]?.body?.slice(0, 100)}
                ...
              </p>
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}

export default SectionComponent
