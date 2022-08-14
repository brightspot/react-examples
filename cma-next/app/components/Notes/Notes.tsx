import NoteCard from "../NoteCard/NoteCard";
import styles from "./Notes.module.css";
import { Data } from "../../pages/index";

type Props = {
  notes: Data[] | undefined;
  getItems: Function;
};

const Notes = ({ notes, getItems }: Props) => {
  return (
    <div className={styles.container}>
      {notes &&
        notes.map((item: Data) => (
          <NoteCard
            title={item.title}
            text={item.text}
            id={item._id}
            getItems={getItems}
            key={item._id}
            publishUser={
              item?._globals.com_psddev_cms_db_Content_ObjectModification
                ?.publishUser?.username
            }
            publishDate={
              item?._globals.com_psddev_cms_db_Content_ObjectModification
                ?.publishDate
            }
            updateUser={
              item?._globals.com_psddev_cms_db_Content_ObjectModification
                ?.updateUser?.username
            }
            updateDate={
              item?._globals.com_psddev_cms_db_Content_ObjectModification
                ?.updateDate
            }
          />
        ))}
    </div>
  );
};

export default Notes;
