import Notes from '../Notes'
import CreateNoteForm from '../CreateNoteForm'
import styles from './Container.module.css'
import { Data } from '../../pages/index'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  items: Data[]
  setItems: Dispatch<SetStateAction<Data[]>>
  getItems: (
    pageNumber: number,
    predicate: boolean,
    queryItem?: string,
    newItem?: Data
  ) => void
  pageNumber: number
  setPageNumber: Dispatch<SetStateAction<number>>
}

const Container = ({
  items,
  setItems,
  getItems,
  pageNumber,
  setPageNumber,
}: Props) => {
  return (
    <section className={styles.section}>
      <CreateNoteForm getItems={getItems} pageNumber={pageNumber} />
      <Notes
        getItems={getItems}
        items={items}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </section>
  )
}

export default Container
