import { useState, useEffect } from "react";
import { TiTimes } from "react-icons/ti";
import styles from "../styles/NoteCard.module.css";
import { useSession } from "next-auth/react";
import Modal from './Modal'

type Props = {
  title: string;
  text: string;
  id: string;
  getItems: Function;
};

type Result = {
  title?: string;
  text?: string;
  id: string;
  toolUser: string;
};

const NoteCard: React.FC<Props> = ({
  title,
  text,
  id,
  getItems,
}) => {
  const { data: session } =useSession()
  const userName: string | undefined | null = session?.user?.name
  const [isOpen, setIsOpen] = useState(false)
  const [editFormState, setEditFormState] = useState({
    id: id,
    currentTitle: title,
    currentText: text,
    userName: "",
  });

  const [error, setError] = useState({ isError: false, message: "" });

  useEffect(() => {
    setEditFormState({
      ...editFormState,
      userName: userName || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, text, id]);

  const submitUpdatedNote = async () => {
    const dataToUpdate = () => {
      const result: Result = { id: id, toolUser: editFormState.userName };
      if (editFormState.currentTitle !== title) {
        result.title = editFormState.currentTitle;
      }
      if (editFormState.currentText !== text) {
        result.text = editFormState.currentText;
      }
      return result;
    };
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateNote`, {
      method: "PATCH",
      body: JSON.stringify(dataToUpdate()),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status >= 400) {
        setError({
          isError: true,
          message: `${res.status} - ${res.statusText}`,
        });
      }
      res.json().then(() => {
        getItems();
      });
    });
  };

  const submitDeleteNote = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteNote`, {
      method: "DELETE",
      body: JSON.stringify(editFormState),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status >= 400) {
        setError({
          isError: true,
          message: `${res.status} - ${res.statusText}`,
        });
      }
      res.json().then(() => {
        getItems();
      });
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.currentTarget.blur();
    }
  };

  if (error.isError) return <div>{error.message}</div>;

  return (
    <>
    <div className={styles.noteCard} key={id} onClick={() => setIsOpen(true)}>
      <form
        className={styles.noteForm}
        onSubmit={(e) => {
          e.preventDefault();
          submitUpdatedNote();
        }}
      >
        <input
          type="text"
          id={`title for id ${id}`}
          aria-label={`title for id ${id}`}
          value={editFormState.currentTitle}
          onChange={(e) =>
            setEditFormState({
              ...editFormState,
              currentTitle: e.target.value,
            })
          }
          onKeyDown={onKeyDown}
        />
        <input
          type="text"
          id={`text for id ${id}`}
          aria-label={`text for id ${id}`}
          value={editFormState.currentText}
          onChange={(e) =>
            setEditFormState({
              ...editFormState,
              currentText: e.target.value,
            })
          }
          onKeyDown={onKeyDown}
        />
        {/* <button className={styles.submitButton} type="submit">
          Submit
        </button> */}
      </form>
      <div className={styles.noteBottom}>
        <button
          className={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            submitDeleteNote();
          }}
        >
          <TiTimes title="delete" className={styles.deleteIcon} />
        </button>
      </div>
    </div>
     <Modal 
     handleClose={() => setIsOpen(false)} isOpen={isOpen}
     title={title}
     text={text}
     id={id}
     getItems={getItems}
     setEditFormState={setEditFormState}
     editFormState={editFormState}
     />
     </>
  );
};

export default NoteCard;
