import Container from "../Container/Container"
import styles from './Footer.module.css'
const Footer = () => {
    return  (
        <footer>
            <div className={styles.footerContainer}>
            <h4>&copy; <a href='https://www.brightspot.com/' target='_blank' className={styles.name} rel="noreferrer">Brightspot</a> App Routing Tutorial</h4>
            </div>
        </footer>

    )
}

export default Footer