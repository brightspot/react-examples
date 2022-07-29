import Container from "../Container/Container"
import styles from './Footer.module.css'
const Footer = () => {
    return  (
        <footer>
        <Container>
            <div className={styles.footerContainer}>
            <h4>Footer</h4>
            </div>
        </Container>
        </footer>

    )
}

export default Footer