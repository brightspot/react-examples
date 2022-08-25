import { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react'
import styles from './NoteCard.module.css'
import Modal from '../Modal'
import { Data } from '../../pages'
import { IoEllipsisVertical } from 'react-icons/io5'
import { RiDeleteBinLine } from 'react-icons/ri'
import { MdOutlineEdit } from 'react-icons/md'

type Props = {
  title: string
  description: string
  id: string
  publishUser: string
  publishDate: number
  updateDate: number
  updateUser: string
  items: Data[]
  setItems: Dispatch<SetStateAction<Data[]>>
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
  setItems,
}: Props) => {
  const optionsRef = useRef<HTMLUListElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [formData, setFormData] = useState({
    id: id,
    title: title,
    description: description,
    username: '',
    publishUser: publishUser,
    publishDate: publishDate,
    updateUser: updateUser,
    updateDate: updateDate,
  })

  const [error, setError] = useState({ isError: false, message: '' })
  useEffect(() => {
    const closeOnEscape = (e: any) => {
      if (showOptions && e.key === 'Escape') {
        setShowOptions(false)
      }
    }
    const closeOnMouseClickOutside = (e) => {
      if (
        showOptions &&
        optionsRef.current &&
        !optionsRef.current.contains(e.target)
      ) {
        setShowOptions(false)
      }
    }
    document.body.addEventListener('keydown', closeOnEscape)
    document.body.addEventListener('mousedown', closeOnMouseClickOutside)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscape)
      document.body.removeEventListener('mousedown', closeOnMouseClickOutside)
    }
  }, [showOptions])

  useEffect(() => {
    const timeId = setTimeout(() => {
      setError({ isError: false, message: '' })
    }, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, [error.isError])

  const submitDeleteNote = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/notes/delete`,
        {
          body: JSON.stringify(formData.id),
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (!response.ok) {
        setError({
          isError: true,
          message: 'cannot delete',
        })
        throw new Error()
      }
      const data = await response.json()

      if (data?.brightspot_example_notes_NoteDelete) {
        const itemToRemoveId = data.brightspot_example_notes_NoteDelete?._id
        const filteredItems = items.filter(
          (item) => item._id !== itemToRemoveId
        )
        setItems(filteredItems)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const toDateTime = (secs: number) => {
    const t = new Date(secs)
    return t.toLocaleDateString('en-us', {
      year: '2-digit',
      month: '2-digit',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    })
  }

  return (
    <>
      <div
        className={styles.noteCard}
        key={id}
        data-hide={isOpen ? true : null}
      >
        <div className={styles.noteForm}>
          <div className={styles.inputFieldTitle}>{formData.title}</div>
          <div className={styles.inputFieldText}>{formData.description}</div>
          <div className={styles.inputFieldUserInfo}>
            {`created: ${formData.publishUser} \u2022 ${toDateTime(
              formData.publishDate
            )}`}
          </div>
          <div className={styles.inputFieldUserInfo}>
            {`updated: ${formData.updateUser} \u2022 ${toDateTime(
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
            <ul className={styles.optionsList} ref={optionsRef}>
              <li
                onClick={() => {
                  setIsOpen(true)
                }}
              >
                <RiDeleteBinLine />
                <span>Update</span>
              </li>
              <li
                onClick={() => {
                  submitDeleteNote()
                }}
              >
                <MdOutlineEdit />
                <span>Delete</span>
              </li>
            </ul>
          )}
          {error && <span className={styles.error}>{error.message}</span>}
        </div>
      </div>
      {isOpen && (
        <Modal
          handleClose={() => setIsOpen(false)}
          isOpen={isOpen}
          id={id}
          formData={formData}
          setFormData={setFormData}
          title={title}
          description={description}
        />
      )}
    </>
  )
}

export default NoteCard
