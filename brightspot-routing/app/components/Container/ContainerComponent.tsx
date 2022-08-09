import styles from './Container.module.css'

type Props = {
  children: React.ReactNode
}

const ContainerComponent = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>
}

export default ContainerComponent
