import type { NextPage } from 'next'
import styles from './Banner.module.css'

interface Props {
  name: string | undefined | null
}

const BannerView: NextPage<Props> = ({ name }) => {
  return (
    <div className={styles.bannerContainer}>
      <h1 className={styles.bannerTitle}>{name}</h1>
    </div>
  )
}

export default BannerView
