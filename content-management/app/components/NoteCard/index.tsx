import styles from './NoteCard.module.css'
import { useState, useEffect, useRef, SetStateAction, Dispatch } from 'react'

import { IoEllipsisVertical, IoClose } from 'react-icons/io5'
import { RiDeleteBinLine } from 'react-icons/ri'
import { MdOutlineEdit } from 'react-icons/md'

import {
  Brightspot_Example_Content_Management_Note,
  Mutation,
} from 'generated/graphql'
import { convertTimestamp, assertIsNode } from 'helpers/utils'
import Modal from '../Modal'

type Props = {
  title: string | undefined | null
  description: string | undefined | null
  id: string | undefined | null
  publishUser: string | undefined | null
  publishDate: number | undefined | null
  updateDate: number | undefined | null
  updateUser: string | undefined | null
  items: Brightspot_Example_Content_Management_Note[] | undefined | null
  getItems: (
    pageNumber: number,
    predicate: boolean,
    queryItem?: string,
    newItem?: Brightspot_Example_Content_Management_Note
  ) => void
  pageNumber: number
  setPageNumber: Dispatch<SetStateAction<number>>
}

const NoteCard = ({
  title,
  description,
  id,
  publishUser,
  publishDate,
  updateDate,
  updateUser,
  items,
  getItems,
  pageNumber,
  setPageNumber,
}: Props) => {
  const optionsRef = useRef<HTMLUListElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    id,
    title,
    description,
    publishUser,
    publishDate,
    updateUser,
    updateDate,
  })

  const url = `${process.env.NEXT_PUBLIC_HOST}/api/notes/delete`
  const params = {
    body: JSON.stringify(formData.id),
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  useEffect(() => {
    const closeOnMouseClickOutside = ({ target }: MouseEvent) => {
      assertIsNode(target)
      if (showOptions && optionsRef && !optionsRef?.current?.contains(target)) {
        setShowOptions(false)
      }
    }

    document.body.addEventListener('mousedown', closeOnMouseClickOutside)
    return () => {
      document.body.removeEventListener('mousedown', closeOnMouseClickOutside)
    }
  }, [showOptions])

  const processResponse = (res: Mutation) => {
    if (res?.brightspot_example_content_management_NoteDelete?._id) {
      const id = res?.brightspot_example_content_management_NoteDelete._id
      return id
    } else if (res) {
      setError(res as unknown as string)
    }
  }

  const updatePageItems = (id?: string) => {
    if (id && items?.length === 1 && pageNumber > 1) {
      getItems(pageNumber - 1, true, id)
      setPageNumber(pageNumber - 1)
    } else if (id) {
      getItems(pageNumber, true, id)
    } else if (!id) {
      console.log(
        'no id was returned from the delete request. Check that the delete request was processed correctly.'
      )
    }
  }

  const submitDeleteNote = () => {
    fetch(url, params)
      .then((res) => res.json())
      .then((res) => processResponse(res))
      .then((id) => updatePageItems(id))
      .catch((err: Error) => {
        if (!error) {
          setError(err.message)
        }
      })
  }

  return (
    <>
      <div
        className={styles.noteCard}
        key={id}
        data-hide={isOpen ? true : null}
      >
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
        <div className={styles.noteForm}>
          <div className={styles.inputFieldTitle}>{formData.title}</div>
          <div className={styles.inputFieldText}>{formData.description}</div>
          <div className={styles.inputFieldUserInfo}>
            {`created: ${formData.publishUser} \u2022 ${convertTimestamp(
              formData.publishDate
            )}`}
          </div>
          <div className={styles.inputFieldUserInfo}>
            {`updated: ${formData.updateUser} \u2022 ${convertTimestamp(
              formData.updateDate
            )}`}
          </div>
        </div>
        <div className={styles.noteBottom}>
          <button
            className={styles.optionsButton}
            onClick={(e) => {
              e.stopPropagation()
              setShowOptions(true)
            }}
          >
            <IoEllipsisVertical className={styles.optionsIcon} />
          </button>
          {showOptions && (
            <ul
              className={styles.optionsList}
              ref={optionsRef}
              role="listmenu"
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setShowOptions(false)
                }
              }}
            >
              <li
                tabIndex={0}
                role="menuitem"
                onClick={() => {
                  setIsOpen(true)
                  setShowOptions(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsOpen(true)
                    setShowOptions(false)
                  }
                }}
              >
                <RiDeleteBinLine className={styles.listIcon} />
                <span>Update</span>
              </li>
              <li
                tabIndex={0}
                role="menuitem"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    submitDeleteNote()
                    setShowOptions(false)
                  }
                }}
                onClick={() => {
                  submitDeleteNote()
                  setShowOptions(false)
                }}
              >
                <MdOutlineEdit className={styles.listIcon} />
                <span>Delete</span>
              </li>
            </ul>
          )}
        </div>
      </div>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </>
  )
}

export default NoteCard
