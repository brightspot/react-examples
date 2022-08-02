import styles from '../styles/Modal.module.css';
import { useEffect, useState, useRef } from 'react';
import Portal from './Portal';
import { TiTimes } from "react-icons/ti";

type Props = {
    title: string,
    text: string,
    id: string
    isOpen: boolean,
    handleClose: () => void
    getItems: Function;
    setEditFormState: Function,
    editFormState: {
        id: string,
        currentTitle: string,
        currentText: string,
        userName: string
    }


}
type Result = {
    title?: string;
    text?: string;
    id: string;
    toolUser: string;
  };

function Modal({ title, text, id, isOpen, handleClose, getItems, editFormState, setEditFormState }: Props) {
    const inputRef = useRef<HTMLDivElement>(null)
    const [isSSR, setIsSSR] = useState(true);

    useEffect(()=> {
        setIsSSR(!isSSR)
    },[isOpen])
    useEffect(() => {
        console.log('RUNNING CLOSE ON ESCAPE USE EFFECT')
        const closeOnEscapeKey = (e: { key: string; }) => e.key === 'Escape' ? handleClose() : null;
        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        }
    }, [handleClose])

    const USER = "notes-user";


    const [error, setError] = useState({ isError: false, message: "" });
      
    const submitUpdatedNote = async () => {
      const dataToUpdate = () => {
        const result: Result = { id: id, toolUser: editFormState.userName };
        console.log('submitting updated note with following: ', result, editFormState)
        if (editFormState.currentTitle !== title) {
          result.title = editFormState.currentTitle || '';
        }
        if (editFormState.currentText !== text) {
          result.text = editFormState.currentText || '';
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
        res.json().then((res) => {
            console.log('running getItems!', res)
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

    useEffect(() => {
        if(inputRef.current) {
            console.log('YEAH!!')
           inputRef.current.focus()
        }
    },[isOpen, isSSR])
  
    if (error.isError) return <div>{error.message}</div>;
  
    if (!isOpen) return null;

    return (
        <Portal wrapperId='note-portal-modal-container'>
        <div className={styles.modal}>
        <div className={styles.noteCard}>
        <div
        className={styles.noteForm}
      >
        <div
        ref={inputRef}
        className={styles.inputField}
        contentEditable='true'
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
        >{editFormState.currentTitle}</div>
        <div
        className={styles.noteFormInput}
        contentEditable='true'
        suppressContentEditableWarning={true}
          id={`text for id ${id}`}
          aria-label={`text for id ${id}`}
          onBlur={(e) => {
            console.log('HELLO!!!', e.target.innerText)
            setEditFormState({
              ...editFormState,
              currentText: e.target.innerText,
            })
          }
          }
          onKeyDown={onKeyDown}
        >
        {editFormState.currentText}
        </div>
        <button className={styles.submitButton} onClick={(e) => {
            e.preventDefault();
            submitUpdatedNote();
            handleClose()
        }}>
          Close
        </button>
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
      </div>
      </div>
        </div>
        </Portal>
    )
}

export default Modal;
