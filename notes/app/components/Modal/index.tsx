import styles from './Modal.module.css'
import { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react'
import Portal from '../Portal'
import FocusTrap from 'focus-trap-react'
import { runErrorWithTimeout } from '../../lib/utils'

type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  formData: {
    id: string
    title?: string
    description?: string
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
      publishUser: string
      publishDate: number
      updateUser: string
      updateDate: number
    }>
  >
}

type DataToSubmit = {
  id: string
  title?: string
  description?: string
  toolUser?: string
}

function Modal({ isOpen, setIsOpen, formData, setFormData }: Props) {
  const [error, setError] = useState<string | null>(null)

  const outerModalRef = useRef<HTMLDivElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    runErrorWithTimeout(error, setError, 5000)
  }, [error])

  const url = `${process.env.NEXT_PUBLIC_HOST}/api/notes/update`

  const params = () => {
    let dataToSubmit: DataToSubmit = { id: formData.id }
    if (titleRef?.current?.value !== formData.title) {
      dataToSubmit.title = titleRef?.current?.value
    }
    if (descriptionRef?.current?.value !== formData.description) {
      dataToSubmit.description = descriptionRef?.current?.value
    }
    if (usernameRef?.current?.value) {
      dataToSubmit.toolUser = usernameRef?.current?.value
    }
    return {
      body: JSON.stringify(dataToSubmit),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }

  const processResponse = (res: any) => {
    if (res?.brightspot_example_notes_NoteSave) {
      setFormData({
        id: res?.brightspot_example_notes_NoteSave._id,
        title: res?.brightspot_example_notes_NoteSave.title,
        description: res?.brightspot_example_notes_NoteSave.description,
        publishUser:
          res.brightspot_example_notes_NoteSave._globals
            .com_psddev_cms_db_Content_ObjectModification.publishUser.username,
        publishDate:
          res.brightspot_example_notes_NoteSave._globals
            .com_psddev_cms_db_Content_ObjectModification.publishDate,
        updateUser:
          res.brightspot_example_notes_NoteSave._globals
            .com_psddev_cms_db_Content_ObjectModification.updateUser.username,
        updateDate:
          res.brightspot_example_notes_NoteSave._globals
            .com_psddev_cms_db_Content_ObjectModification.updateDate,
      })
      setIsOpen(false)
    } else if (res.error) {
      setError(res.error)
    }
  }

  const submitUpdatedNote = async () => {
    if (
      titleRef?.current?.value !== formData.title ||
      descriptionRef?.current?.value !== formData.description
    ) {
      fetch(url, params())
        .then((res) => {
          console.log(res)
          return res.json()
        })
        .then((res) => processResponse(res))
        .catch((error: Error) => setError(error.message))
    } else {
      setIsOpen(false)
    }
  }

  if (!isOpen) return null

  return (
    <Portal wrapperId="note-portal-modal-container">
      <FocusTrap active={isOpen}>
        <div
          className={styles.modal}
          ref={outerModalRef}
          onClick={() => {
            setIsOpen(false)
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
                defaultValue={formData.title}
                aria-label={`title for id ${formData.id}`}
                ref={titleRef}
              />
              <input
                required
                className={styles.inputFieldText}
                defaultValue={formData.description}
                aria-label={`description for id ${formData.id}`}
                ref={descriptionRef}
              />
              <input
                required
                className={styles.inputFieldText}
                placeholder="enter user name to update...."
                aria-label="username input"
                ref={usernameRef}
              />
              <div className={styles.noteBottom}>
                {error && <span className={styles.error}>{error}</span>}
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
                <button type="submit" className={styles.button}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </FocusTrap>
    </Portal>
  )
}

export default Modal
