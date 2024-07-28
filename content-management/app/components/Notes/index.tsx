import styles from './Notes.module.css'
import { Dispatch, SetStateAction } from 'react'

import { Brightspot_Example_Content_Management_Note } from 'generated/graphql'
import NoteCard from '../NoteCard'

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

const Notes = ({ items, getItems, pageNumber, setPageNumber }: Props) => (
  <div className={styles.container}>
    {items &&
      items.map((item: Brightspot_Example_Content_Management_Note) => (
        <NoteCard
          items={items}
          getItems={getItems}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          title={item?.title}
          description={item.description}
          id={item._id}
          key={item._id}
          publishUser={
            item?._globals?.com_psddev_cms_db_Content_ObjectModification
              ?.publishUser?.username
          }
          publishDate={
            item?._globals?.com_psddev_cms_db_Content_ObjectModification
              ?.publishDate
          }
          updateUser={
            item?._globals?.com_psddev_cms_db_Content_ObjectModification
              ?.updateUser?.username
          }
          updateDate={
            item?._globals?.com_psddev_cms_db_Content_ObjectModification
              ?.updateDate
          }
        />
      ))}
  </div>
)

export default Notes
