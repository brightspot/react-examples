import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import { Section } from '../../generated/graphql'


interface Props {
  section: Section
}

const SectionView: NextPage<Props> = ({ section }) => {

  const router = useRouter()

  const mySection = router.query.section

  return (
    <div className={styles.grid}>
      {section.Article_section_connection?.items.map((item, index) =>
        <a href={`${process.env.NEXT_PUBLIC_HOST}/${mySection}${item.url}`} className={styles.card} key={index}>
          <h2>{item.headline}</h2>
        </a>
      )}
    </div>
  )
}

export default SectionView
