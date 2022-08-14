import styles from "./Modal.module.css";
import { useEffect, useState } from "react";
import Portal from "../Portal/Portal";
import FocusTrap from "focus-trap-react";

type Props = {
  title: string;
  text: string;
  id: string;
  isOpen: boolean;
  handleClose: () => void;
  setEditFormState: Function;
  userName: string | null | undefined;
  editFormState: {
    id: string;
    currentTitle: string;
    currentText: string;
    userName: string;
  };
  formData: {
    id: string;
    title: string;
    text: string;
    userName: string | null | undefined;
  };
  setFormData: Function;
};
type Result = {
  title?: string;
  text?: string;
  id: string;
  toolUser: string;
};

function Modal({
  title,
  text,
  id,
  isOpen,
  handleClose,
  userName,
  formData,
  setFormData,
  editFormState,
  setEditFormState,
}: Props) {
  useEffect(() => {
    const closeOnEscapeKey = (e: { key: string }) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  const [error, setError] = useState({ isError: false, message: "" });
  const submitUpdatedNote = () => {
    if (!editFormState.currentTitle || !editFormState.currentText) {
      alert("please verify there is a title and text for your note");
      return;
    }
    const dataToUpdate = () => {
      const result: Result = { id: id, toolUser: userName! };
      if (editFormState.currentTitle !== title) {
        result.title = editFormState.currentTitle;
      }
      if (editFormState.currentText !== text) {
        result.text = editFormState.currentText;
      }
      return result;
    };
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/createAndUpdateNote`, {
      body: JSON.stringify(dataToUpdate()),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status >= 400) {
          setError({
            isError: true,
            message: `${res.status} - ${res.statusText}`,
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.brightspot_example_cma_next_NoteSave) {
          setFormData({
            id: data?.brightspot_example_cma_next_NoteSave._id,
            title: data?.brightspot_example_cma_next_NoteSave.title,
            text: data?.brightspot_example_cma_next_NoteSave.text,
            userName: userName,
          });
          handleClose();
        } else if (!data.brightspot_example_cma_next_NoteSave) {
          alert("could not update data...");
        }
      });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.currentTarget.blur();
    }
  };

  if (error.isError) return <div>{error.message}</div>;

  if (!isOpen) return null;

  return (
    <Portal wrapperId="note-portal-modal-container">
      <FocusTrap active={isOpen}>
        <div
          className={styles.modal}
          onClick={(e) => {
            handleClose();
          }}
        >
          <div className={styles.noteCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.noteForm}>
              <div
                className={styles.inputField}
                contentEditable="true"
                suppressContentEditableWarning={true}
                id={`title for id ${id}`}
                aria-label={`title for id ${id}`}
                onBlur={(e) =>
                  setEditFormState({
                    ...editFormState,
                    currentTitle: e.currentTarget.innerText,
                  })
                }
                onKeyDown={onKeyDown}
              >
                {formData.title}
              </div>
              <div
                className={styles.inputField}
                contentEditable="true"
                suppressContentEditableWarning={true}
                id={`text for id ${id}`}
                aria-label={`text for id ${id}`}
                onBlur={(e) => {
                  setEditFormState({
                    ...editFormState,
                    currentText: e.target.innerText,
                  });
                }}
                onKeyDown={onKeyDown}
              >
                {formData.text}
              </div>
              <div className={styles.noteBottom}>
                <button
                  className={styles.submitButton}
                  onClick={(e) => {
                    e.preventDefault();
                    submitUpdatedNote();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </FocusTrap>
    </Portal>
  );
}

export default Modal;
