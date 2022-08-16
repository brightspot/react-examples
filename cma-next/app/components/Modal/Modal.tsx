import styles from './Modal.module.css'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Portal from '../Portal/Portal'
import FocusTrap from 'focus-trap-react'

type Props = {
  id: string
  title: string
  text: string
  isOpen: boolean
  handleClose: () => void
  userName: string | null | undefined
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
  setFormData: Dispatch<
    SetStateAction<{
      id: string
      title: string
      text: string
      userName: string | null | undefined
      publishUser: string
      publishDate: number
      updateUser: string
      updateDate: number
    }>
  >
}
type Result = {
  title?: string
  text?: string
  id: string
  toolUser: string
}

function Modal({
  id,
  title,
  text,
  isOpen,
  handleClose,
  userName,
  formData,
  setFormData,
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
    if (!userName) {
      alert(
        'check that your user icon is in the right of the navbar. If not, try logging out and logging in again.'
      )
      return
    }
    const dataToUpdate = () => {
      const result: Result = { id: id, toolUser: userName }
      if (formData.title) {
        result.title = formData.title
      }
      if (formData.text) {
        result.text = formData.text
      }
      return result
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/createAndUpdateNote`,
        {
          body: JSON.stringify(dataToUpdate()),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        setError({
          isError: true,
          message: 'cannot update note' + response.statusText,
        })
        setFormData({
          ...formData,
          title: title,
          text: text,
        })
        throw new Error()
      }
      const data = await response.json()

      if (data?.brightspot_example_cma_next_NoteSave) {
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
              .com_psddev_cms_db_Content_ObjectModification.updateUser.username,
          updateDate:
            data.brightspot_example_cma_next_NoteSave._globals
              .com_psddev_cms_db_Content_ObjectModification.updateDate,
        })
        handleClose()
      }
      if (!data?.brightspot_example_cma_next_NoteSave) {
        setFormData({
          ...formData,
          title: title,
          text: text,
        })
      }
    } catch (error) {
      console.log(error)
    }
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
            <form
              className={styles.noteForm}
              onSubmit={(e) => {
                e.preventDefault()
                submitUpdatedNote()
              }}
            >
              <input
                required
                className={styles.inputFieldTitle}
                value={formData.title}
                aria-label={`title for id ${id}`}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                onKeyDown={onKeyDown}
              />
              <input
                required
                className={styles.inputFieldText}
                value={formData.text}
                aria-label={`text for id ${id}`}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    text: e.target.value,
                  })
                }}
                onKeyDown={onKeyDown}
              />
              <div className={styles.noteBottom}>
                <button className={styles.submitButton} type="submit">
                  Save
                </button>
                {error.isError && (
                  <span className={styles.error}>{error.message}</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </FocusTrap>
    </Portal>
  )
}

export default Modal
