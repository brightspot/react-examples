import { useState, useEffect } from "react";
import { TiTimes } from "react-icons/ti";
import styles from "./NoteCard.module.css";
import { useSession } from "next-auth/react";
import Modal from "../Modal/Modal";

type Props = {
  title: string;
  text: string;
  id: string;
  publishUser: string;
  getItems: () => void;
  publishDate: number;
  updateDate: number;
  updateUser: string;
};

const NoteCard = ({
  title,
  text,
  id,
  getItems,
  publishUser,
  publishDate,
  updateDate,
  updateUser,
}: Props) => {
  const { data: session } = useSession();
  const userName: string | undefined | null = session?.user?.name;
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: id,
    title: title,
    text: text,
    userName: userName,
    publishUser: publishUser,
    publishDate: publishDate,
    updateUser: updateUser,
    updateDate: updateDate,
  });
  const [editFormState, setEditFormState] = useState({
    id: id,
    currentTitle: title,
    currentText: text,
    userName: "",
  });
  const [error, setError] = useState({ isError: false, message: "" });

  useEffect(() => {
    const timeId = setTimeout(() => {
      setError({ isError: false, message: "" });
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [error.isError]);

  const submitDeleteNote = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteNote`, {
      body: JSON.stringify(editFormState),
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setError({
            isError: true,
            message: `cannot delete`,
          });
          throw new Error();
        }
        return response.json();
      })
      .then(() => {
        getItems();
      })
      .catch((error) => console.log(error));
  };

  const toDateTime = (secs: number) => {
    const t = new Date(secs);
    return t.toLocaleDateString("en-us", {
      year: "2-digit",
      month: "2-digit",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <>
      <div
        className={styles.noteCard}
        key={id}
        onClick={() => {
          setIsOpen(true);
        }}
        data-hide={isOpen ? true : null}
      >
        <div className={styles.noteForm}>
          <div className={styles.inputField}>{formData.title}</div>
          <div className={styles.inputField} id={`text for id ${id}`}>
            {formData.text}
          </div>
          <div className={styles.inputFieldUserInfo}>
            {`created: ${formData.publishUser} \u2022 ${toDateTime(
              formData.publishDate
            )}`}
          </div>
          <div className={styles.inputFieldUserInfo}>
            {`updated: ${formData.updateUser} \u2022 ${toDateTime(
              formData.updateDate
            )}`}
          </div>
        </div>
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
          {error && <span className={styles.error}>{error.message}</span>}
        </div>
      </div>
      {isOpen && (
        <Modal
          handleClose={() => setIsOpen(false)}
          isOpen={isOpen}
          title={title}
          text={text}
          id={id}
          setEditFormState={setEditFormState}
          editFormState={editFormState}
          userName={userName}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </>
  );
};

export default NoteCard;
