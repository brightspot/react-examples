import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import { Page } from '../../generated/graphql'

interface Props {
  page: Page
}

const HomeView: NextPage<Props> = ({ page }) => {
  return (
    <div className={styles.grid}>
      {page.Section_page_connection?.items.map((item, index) => 
        <a href={`${process.env.NEXT_PUBLIC_HOST}${item.url}`} className={styles.card} key={index}>
          <h2>{item.name}</h2>
        </a>
      )}
    </div>
  )
}

export default HomeView
