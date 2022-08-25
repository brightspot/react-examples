import NoteCard from '../NoteCard'
import styles from './Notes.module.css'
import { Data } from '../../pages/index'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  items: Data[]
  setItems: Dispatch<SetStateAction<Data[]>>
}

const Notes = ({ items, setItems }: Props) => {
  console.log({ items })
  return (
    <div className={styles.container}>
      {items &&
        items.map((item: Data) => (
          <NoteCard
            items={items}
            setItems={setItems}
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
