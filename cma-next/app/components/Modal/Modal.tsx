import styles from './Modal.module.css'
import { useEffect, useState } from 'react'
import Portal from '../Portal/Portal'
import FocusTrap from 'focus-trap-react'

type Props = {
  title: string
  text: string
  id: string
  isOpen: boolean
  handleClose: () => void
  setEditFormState: Function
  userName: string | null | undefined
  editFormState: {
    id: string
    currentTitle: string
    currentText: string
    userName: string
  }
  formData: {
    id: string
    title: string
    text: string
    userName: string | null | undefined
    publishUser: string
    publishDate: number
    updateUser: string
    updateDate: number
  }
  setFormData: Function
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
  userName,
  formData,
  setFormData,
  editFormState,
  setEditFormState,
}: Props) {
  const [error, setError] = useState({ isError: false, message: '' })
  useEffect(() => {
    const closeOnEscapeKey = (e: { key: string }) =>
      e.key === 'Escape' ? handleClose() : null
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])

  useEffect(() => {
    if (error.isError) {
      const timeId = setTimeout(() => {
        setError({ isError: false, message: '' })
        handleClose()
      }, 3000)
      return () => {
        clearTimeout(timeId)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error.isError])

  const submitUpdatedNote = async () => {
    if (!editFormState.currentTitle || !editFormState.currentText) {
      alert('please verify there is a title and text for your note')
      return
    }
    if (!userName) {
      alert(
        'check that your user icon is in the right of the navbar. If not, try logging out and logging in again.'
      )
      return
    }
    const dataToUpdate = () => {
      const result: Result = { id: id, toolUser: userName }
      if (editFormState.currentTitle !== title) {
        result.title = editFormState.currentTitle
      }
      if (editFormState.currentText !== text) {
        result.text = editFormState.currentText
      }
      return result
    }
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/createAndUpdateNote`, {
      body: JSON.stringify(dataToUpdate()),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          setError({
            isError: true,
            message: `could not update: ${res.status} - ${res.statusText}`,
          })
          throw new Error()
        }
        return res.json()
      })
      .then((data) => {
        if (data.brightspot_example_cma_next_NoteSave) {
          console.log(
            'data received ',
            data.brightspot_example_cma_next_NoteSave
          )
          setFormData({
            id: data?.brightspot_example_cma_next_NoteSave._id,
            title: data?.brightspot_example_cma_next_NoteSave.title,
            text: data?.brightspot_example_cma_next_NoteSave.text,
            userName: userName,
            publishUser:
              data.brightspot_example_cma_next_NoteSave._globals
                .com_psddev_cms_db_Content_ObjectModification.publishUser
                .username,
            publishDate:
              data.brightspot_example_cma_next_NoteSave._globals
                .com_psddev_cms_db_Content_ObjectModification.publishDate,
            updateUser:
              data.brightspot_example_cma_next_NoteSave._globals
                .com_psddev_cms_db_Content_ObjectModification.updateUser
                .username,
            updateDate:
              data.brightspot_example_cma_next_NoteSave._globals
                .com_psddev_cms_db_Content_ObjectModification.updateDate,
          })
          handleClose()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.currentTarget.blur()
    }
  }

  if (!isOpen) return null

  return (
    <Portal wrapperId="note-portal-modal-container">
      <FocusTrap active={isOpen}>
        <div
          className={styles.modal}
          onClick={() => {
            handleClose()
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
                  })
                }}
                onKeyDown={onKeyDown}
              >
                {formData.text}
              </div>
              <div className={styles.noteBottom}>
                <button
                  className={styles.submitButton}
                  onClick={(e) => {
                    e.preventDefault()
                    submitUpdatedNote()
                  }}
                >
                  Save
                </button>
                {error.isError && (
                  <span className={styles.error}>{error.message}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </FocusTrap>
    </Portal>
  )
}

export default Modal
