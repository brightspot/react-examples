import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <h4>
          App Routing with{' '}
          <a
            href="https://www.brightspot.com/"
            target="_blank"
            rel="noreferrer"
            className={styles.name}
          >
            Brightspot
          </a>
        </h4>
      </div>
    </footer>
  )
}

export default Footer
