import { useState, useEffect } from "react";
import { TiTimes } from "react-icons/ti";
import styles from "../styles/HelloWorldCard.module.css";

type HelloWorldCardProps = {
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

const HelloWorldCard: React.FC<HelloWorldCardProps> = ({
  title,
  text,
  id,
  getItems,
}) => {
  const USER = "hw-user";
  const [isSSR, setIsSSR] = useState(true);
  const [editFormState, setEditFormState] = useState({
    id: id,
    currentTitle: title,
    currentText: text,
    userName: "",
  });
  const [showSucessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });

  useEffect(() => {
    setIsSSR(false);
    setEditFormState({
      ...editFormState,
      userName: sessionStorage.getItem(USER) || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [showSucessMessage]);

  const submitUpdatedHelloWorld = async () => {
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
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateHello`, {
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

  const submitDeleteHelloWorld = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteHello`, {
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
    <div className={styles.helloWorldCard} key={id}>
      <form
        className={styles.helloWorldForm}
        onSubmit={(e) => {
          e.preventDefault();
          submitUpdatedHelloWorld();
        }}
      >
        <label htmlFor="title">Title</label>
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
        <label htmlFor="text">Text</label>
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
        <p>ID:</p>
        <p className={styles.id}>{id}</p>
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
      <div className={styles.helloWorldBottom}>
        {showSucessMessage && (
          <span className={styles.helloWorldSuccess}>Updated</span>
        )}
        <button
          className={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            submitDeleteHelloWorld();
          }}
        >
          <TiTimes title="delete" className={styles.deleteIcon} />
        </button>
      </div>
    </div>
  );
};

export default HelloWorldCard;
