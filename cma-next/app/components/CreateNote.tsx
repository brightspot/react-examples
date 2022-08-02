import { useState, useEffect, useRef } from "react";
import styles from "../styles/CreateNote.module.css";
import { useSession }  from 'next-auth/react'

type Props = {
  getItems: Function;
};


const CreateNote: React.FC<Props> = ({ getItems }) => {
  const [error, setError] = useState({ isError: false, message: "" });
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession()
  const userName: string | undefined | null = session?.user?.name

  const submitNewNote = async () => {
    const text = textRef?.current?.value;
    const title = titleRef?.current?.value;

    const newNoteValues = {
      text,
      title,
      userName,
    };

    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/newNote`, {
      method: "POST",
      body: JSON.stringify(newNoteValues),
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
        if (titleRef?.current?.value && textRef?.current?.value) {
          titleRef.current.value = "";
          textRef.current.value = "";
        }
        getItems();
      });
    });
  };

  if (error.isError) return <div>{error.message}</div>;

  return (
    <form
      className={styles.createNoteForm}
      onSubmit={(e) => {
        e.preventDefault();
        submitNewNote();
      }}
    >
      <div className={styles.createNoteWrapper}>
        <label>
          <p>Title</p>
          <input
            className={styles.createNoteInput}
            ref={titleRef}
            type="text"
            placeholder=""
            required
          />
        </label>
        <label>
          <p>Text</p>
          <input
            className={styles.createNoteInput}
            ref={textRef}
            type="text"
            placeholder=""
            required
          />
        </label>
      </div>
      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
};

export default CreateNote;
