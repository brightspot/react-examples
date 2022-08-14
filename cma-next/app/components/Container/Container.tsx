import Notes from '../Notes/Notes'
import CreateNote from '../CreateNote/CreateNote'
import styles from './Container.module.css'
import { Data } from '../../pages/index'

type Props = {
  search: (data: Data[]) => Data[] | undefined
  items: Data[]
  getItems: () => void
}

const Container = ({ search, items, getItems }: Props) => {
  return (
    <section className={styles.section}>
      <CreateNote getItems={getItems} />
      <Notes notes={search(items)} getItems={getItems} />
    </section>
  )
}

export default Container
