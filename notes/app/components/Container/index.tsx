import Notes from '../Notes'
import CreateNote from '../CreateNoteForm'
import styles from './Container.module.css'
import { Data } from '../../pages/index'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  items: Data[]
  setItems: Dispatch<SetStateAction<Data[]>>
}

const Container = ({ items, setItems }: Props) => {
  console.log('items in container: ', items)
  return (
    <section className={styles.section}>
      <CreateNote items={items} setItems={setItems} />
      <Notes setItems={setItems} items={items} />
    </section>
  )
}

export default Container
