import styles from './Modal.module.css'
import { Dispatch, SetStateAction, useState, useRef } from 'react'

import Portal from '../Portal'
import FocusTrap from 'focus-trap-react'
import { IoClose } from 'react-icons/io5'

import {
  Mutation,
  CreateAndUpdateNoteMutationVariables,
} from 'generated/graphql'

type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  formData: {
    id: string | null | undefined
    title: string | null | undefined
    description: string | null | undefined
    publishUser: string | null | undefined
    publishDate: number | null | undefined
    updateUser: string | null | undefined
    updateDate: number | null | undefined
  }

  setFormData: Dispatch<
    SetStateAction<{
      id: string | null | undefined
      title: string | null | undefined
      description: string | null | undefined
      publishUser: string | null | undefined
      publishDate: number | null | undefined
      updateUser: string | null | undefined
      updateDate: number | null | undefined
    }>
  >
}

function Modal({ isOpen, setIsOpen, formData, setFormData }: Props) {
  const [error, setError] = useState<string | null>(null)

  const outerModalRef = useRef<HTMLDivElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)

  const url = `${process.env.NEXT_PUBLIC_HOST}/api/notes/update`

  const params = () => {
    let dataToSubmit: CreateAndUpdateNoteMutationVariables = {
      id: formData?.id,
    }
    if (titleRef?.current?.value !== formData?.title) {
      dataToSubmit.title = titleRef?.current?.value
    }
    if (descriptionRef?.current?.value !== formData?.description) {
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

  const processResponse = (res: Mutation) => {
    if (res?.brightspot_example_content_management_NoteSave) {
      setFormData({
        id: res?.brightspot_example_content_management_NoteSave._id,
        title: res?.brightspot_example_content_management_NoteSave.title,
        description:
          res?.brightspot_example_content_management_NoteSave.description,
        publishUser:
          res?.brightspot_example_content_management_NoteSave?._globals
            ?.com_psddev_cms_db_Content_ObjectModification?.publishUser
            ?.username,
        publishDate:
          res?.brightspot_example_content_management_NoteSave?._globals
            ?.com_psddev_cms_db_Content_ObjectModification?.publishDate,
        updateUser:
          res?.brightspot_example_content_management_NoteSave?._globals
            ?.com_psddev_cms_db_Content_ObjectModification?.updateUser
            ?.username,
        updateDate:
          res?.brightspot_example_content_management_NoteSave?._globals
            ?.com_psddev_cms_db_Content_ObjectModification?.updateDate,
      })
      setIsOpen(false)
    } else if (res) {
      setError(res as unknown as string)
    }
  }

  const submitUpdatedNote = async () => {
    if (
      titleRef?.current?.value !== formData?.title ||
      descriptionRef?.current?.value !== formData?.description
    ) {
      fetch(url, params())
        .then((res) => res.json())
        .then((res) => processResponse(res))
        .catch((err: Error) => {
          if (!error) {
            setError(err.message)
          }
        })
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
          <div className={styles.card} onClick={(e) => e.stopPropagation()}>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault()
                submitUpdatedNote()
              }}
            >
              <input
                required
                className={styles.titleInput}
                defaultValue={formData?.title || undefined}
                aria-label={`title for id ${formData?.id}`}
                ref={titleRef}
              />
              <input
                required
                className={styles.textInput}
                defaultValue={formData?.description || undefined}
                aria-label={`description for id ${formData?.id}`}
                ref={descriptionRef}
              />
              <input
                required
                className={styles.textInput}
                placeholder="enter user name to update...."
                aria-label="username input"
                ref={usernameRef}
              />
              <div className={styles.bottom}>
                {error && (
                  <>
                    <button
                      className={styles.errorCloseBtn}
                      onClick={() => setError(null)}
                    >
                      <IoClose className={styles.errorCloseIcon} />
                    </button>
                    <span className={styles.error}>{error}</span>
                  </>
                )}
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
