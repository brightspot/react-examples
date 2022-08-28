import NoteCard from '../NoteCard'
import styles from './Notes.module.css'
import { Data } from '../../pages/index'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  items: Data[]
  getItems: (
    pageNumber: number,
    predicate: boolean,
    queryItem?: string,
    newItem?: Data
  ) => void
  pageNumber: number
  setPageNumber: Dispatch<SetStateAction<number>>
}

const Notes = ({ items, getItems, pageNumber, setPageNumber }: Props) => {
  return (
    <div className={styles.container}>
      {items &&
        items.map((item: Data) => (
          <NoteCard
            items={items}
            getItems={getItems}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            title={item.title}
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
}

export default Notes
