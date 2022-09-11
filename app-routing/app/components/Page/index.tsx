import Meta from '../Meta'
import styles from './Page.module.css'
import Footer from '../Footer'
import Navbar from '../Navbar'

type Props = {
  children: React.ReactNode
}

const Page = ({ children }: Props) => {
  return (
    <div className={styles.app}>
      <Meta />
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}

export default Page
