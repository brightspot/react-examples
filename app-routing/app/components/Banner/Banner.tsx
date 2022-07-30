import styles from './Banner.module.css'

type Props = {
    name: string | null | undefined
}

const Banner = ({ name }: Props) => {
    return (
        <div className={styles.bannerContainer}>
            <h1 className={styles.bannerTitle}>{name}</h1>
        </div>
    )
}

export default Banner