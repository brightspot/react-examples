import Notes from './Notes';
import CreateNote from './CreateNote';
import styles from '../styles/Container.module.css'
import { Data } from '../pages/index'

type Props = {
  search: (data: Data[]) => Data[] | undefined,
  items: Data[],
  getItems: Function
}

const Container: React.FC<Props> = ({ search, items, getItems }) => {

  return (
    <section className={styles.section}>
      <CreateNote getItems={getItems} />
      <Notes
        notes={search(items)}
        getItems={getItems}
      />
    </section>
  );
}

export default Container;