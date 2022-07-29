import Link from "next/link"
import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <div className={styles.navbarContainer}>
        <h2>
            <Link href='/'>
                <a>News</a>
            </Link>
        </h2>
        </div>
    )
}

export default Navbar