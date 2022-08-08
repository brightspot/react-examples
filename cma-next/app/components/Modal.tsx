import styles from '../styles/Modal.module.css'
import { useEffect, useState } from 'react'
import Portal from './Portal'
import { TiTimes } from 'react-icons/ti'
import FocusTrap from 'focus-trap-react'

type Props = {
  title: string
  text: string
  id: string
  isOpen: boolean
  handleClose: () => void
  getItems: Function
  setEditFormState: Function
  editFormState: {
    id: string
    currentTitle: string
    currentText: string
    userName: string
  }
}
type Result = {
  title?: string
  text?: string
  id: string
  toolUser: string
}

function Modal({
  title,
  text,
  id,
  isOpen,
  handleClose,
  getItems,
  editFormState,
  setEditFormState,
}: Props) {
  useEffect(() => {
    const closeOnEscapeKey = (e: { key: string }) =>
      e.key === 'Escape' ? handleClose() : null
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])

  const [error, setError] = useState({ isError: false, message: '' })

  const submitUpdatedNote = async () => {
    console.log(editFormState.currentText, editFormState.currentTitle)
    if (!editFormState.currentTitle || !editFormState.currentText) {
      alert('please verify there is a title and text for your note')
      return
    }
    const dataToUpdate = () => {
      const result: Result = { id: id, toolUser: editFormState.userName }
      if (editFormState.currentTitle !== title) {
        result.title = editFormState.currentTitle
      }
      if (editFormState.currentText !== text) {
        result.text = editFormState.currentText
      }
      return result
    }
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateNote`, {
      method: 'PATCH',
      body: JSON.stringify(dataToUpdate()),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status >= 400) {
          setError({
            isError: true,
            message: `${res.status} - ${res.statusText}`,
          })
        }
        res.json().then((res) => {
          getItems()
        })
      })
      .then(() => {
        handleClose()
      })
  }

  const submitDeleteNote = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteNote`, {
      method: 'DELETE',
      body: JSON.stringify(editFormState),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status >= 400) {
        setError({
          isError: true,
          message: `${res.status} - ${res.statusText}`,
        })
      }
      res.json().then(() => {
        getItems()
      })
    })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.currentTarget.blur()
    }
  }

  if (error.isError) return <div>{error.message}</div>

  if (!isOpen) return null

  return (
    <Portal wrapperId='note-portal-modal-container'>
      <FocusTrap active={isOpen}>
        <div
          className={styles.modal}
          onClick={(e) => {
            handleClose()
          }}
        >
          <div className={styles.noteCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.noteForm}>
              <div
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
              >
                {editFormState.currentTitle}
              </div>
              <div
                className={styles.inputField}
                contentEditable='true'
                suppressContentEditableWarning={true}
                id={`text for id ${id}`}
                aria-label={`text for id ${id}`}
                onBlur={(e) => {
                  setEditFormState({
                    ...editFormState,
                    currentText: e.target.innerText,
                  })
                }}
                onKeyDown={onKeyDown}
              >
                {editFormState.currentText}
              </div>
              <div className={styles.noteBottom}>
                <button
                  className={styles.submitButton}
                  onClick={(e) => {
                    e.preventDefault()
                    submitUpdatedNote()
                  }}
                >
                  Close
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={(e) => {
                    e.stopPropagation()
                    submitDeleteNote()
                  }}
                >
                  <TiTimes title='delete' className={styles.deleteIcon} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </FocusTrap>
    </Portal>
  )
}

export default Modal
