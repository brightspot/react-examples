import { useState } from "react";
import styles from "../styles/CreateNote.module.css";
import { useSession }  from 'next-auth/react'

type Props = {
  getItems: Function;
};


const CreateNote: React.FC<Props> = ({ getItems }) => {
  const { data: session } = useSession()
  const userName: string | undefined | null = session?.user?.name
  const [error, setError] = useState({ isError: false, message: "" });
  const [formState, setFormState] = useState({
    id: '',
    title: '',
    text: '',
    userName: userName
  })

  const submitNewNote = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/newNote`, {
      method: "POST",
      body: JSON.stringify(formState),
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
        setFormState({
          id: '',
          title: '',
          text: '',
          userName: userName
        })
        getItems();
      });
    });
  };

  if (error.isError) return <div>{error.message}</div>;

  return (
    <div
      className={styles.createNoteForm}
    >
      <div className={styles.createNoteWrapper}>
          <h4 className={styles.label}>Title</h4>
          <div
            contentEditable="true"
            className={styles.createNoteInput}
            aria-label="Title"
            onBlur={(e) => {
              setFormState({
                ...formState,
                title: e.currentTarget.innerText
              })
            }}
          ></div>
          <h4 className={styles.label}>Text</h4>
          <div
            contentEditable="true"
            className={styles.createNoteInput}
            aria-label="Title"
            onBlur={(e) => {
              setFormState({
                ...formState,
                text: e.currentTarget.innerText
              })
            }}            
          ></div>
      </div>
      <button className={styles.submitButton} 
      onClick={(e) => {
        e.preventDefault();
        submitNewNote();
      }}
      >
        Submit
      </button>
    </div>
  );
};

export default CreateNote;
