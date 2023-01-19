import styles from './Container.module.css'
import { Dispatch, SetStateAction } from 'react'

import { Brightspot_Example_Content_Management_Note } from 'generated/graphql'
import CreateNoteForm from '../CreateNoteForm'
import Notes from '../Notes'

type Props = {
  items: Brightspot_Example_Content_Management_Note[]
  getItems: (
    pageNumber: number,
    predicate: boolean,
    queryItem?: string,
    newItem?: Brightspot_Example_Content_Management_Note
  ) => void
  pageNumber: number
  setPageNumber: Dispatch<SetStateAction<number>>
}

const Container = ({ items, getItems, pageNumber, setPageNumber }: Props) => (
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

export default Container
