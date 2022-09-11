import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <h4>
          &copy; <span className={styles.name}>News </span>
          App Routing Tutorial
        </h4>
      </div>
    </footer>
  )
}

export default Footer
