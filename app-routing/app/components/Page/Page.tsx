import Meta from '../Meta'
import styles from './Page.module.css'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

type Props = {
    children: React.ReactNode
}


const Page =({children}: Props) => {
return (
    <>
    <Meta />
    <Navbar />
    <div className={styles.layout}>
        <main>{children}</main>
    </div>
    <Footer />
    </>
)
}

export default Page