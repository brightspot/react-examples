import styles from './Modal.module.css'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Portal from '../Portal'
import FocusTrap from 'focus-trap-react'

type Props = {
  id: string
  title: string
  description: string
  isOpen: boolean
  handleClose: () => void
  formData: {
    id: string
    title: string
    description: string
    username: string
    publishUser: string
    publishDate: number
    updateUser: string
    updateDate: number
  }
  setFormData: Dispatch<
    SetStateAction<{
      id: string
      title: string
      description: string
      username: string
      publishUser: string
      publishDate: number
      updateUser: string
      updateDate: number
    }>
  >
}
type Result = {
  title?: string
  description?: string
  id: string
  toolUser: string
}

function Modal({
  id,
  title,
  description,
  isOpen,
  handleClose,
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
    const dataToUpdate = () => {
      const result: Result = { id: id, toolUser: formData.username }
      if (formData.title) {
        result.title = formData.title
      }
      if (formData.description) {
        result.description = formData.description
      }
      return result
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/notes/update`,
        {
          body: JSON.stringify(dataToUpdate()),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status >= 400) {
        console.log('there is an issue')
        setError({
          isError: true,
          message: 'cannot update... Verify username is correct.',
        })
        setFormData({
          ...formData,
          title: title,
          description: description,
        })
        throw new Error()
      }

      const data = await response.json()

      if (data?.brightspot_example_notes_NoteSave) {
        setFormData({
          id: data?.brightspot_example_notes_NoteSave._id,
          title: data?.brightspot_example_notes_NoteSave.title,
          description: data?.brightspot_example_notes_NoteSave.description,
          username:
            data.brightspot_example_notes_NoteSave._globals
              .com_psddev_cms_db_Content_ObjectModification.updateUser.username,
          publishUser:
            data.brightspot_example_notes_NoteSave._globals
              .com_psddev_cms_db_Content_ObjectModification.publishUser
              .username,
          publishDate:
            data.brightspot_example_notes_NoteSave._globals
              .com_psddev_cms_db_Content_ObjectModification.publishDate,
          updateUser:
            data.brightspot_example_notes_NoteSave._globals
              .com_psddev_cms_db_Content_ObjectModification.updateUser.username,
          updateDate:
            data.brightspot_example_notes_NoteSave._globals
              .com_psddev_cms_db_Content_ObjectModification.updateDate,
        })
        handleClose()
      }
      if (!data?.brightspot_example_notes_NoteSave) {
        setFormData({
          ...formData,
          title: title,
          description: description,
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
                value={formData.description}
                aria-label={`description for id ${id}`}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }}
                onKeyDown={onKeyDown}
              />
              <input
                required
                className={styles.inputFieldText}
                value={formData.username}
                placeholder="enter user name to update...."
                aria-label="username input"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    username: e.target.value,
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
