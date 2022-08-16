import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { TiTimes } from 'react-icons/ti'
import styles from './NoteCard.module.css'
import { useSession } from 'next-auth/react'
import Modal from '../Modal/Modal'
import { Data } from '../../pages'

type Props = {
  title: string
  text: string
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
  text,
  id,
  publishUser,
  publishDate,
  updateDate,
  updateUser,
  items,
  setItems,
}: Props) => {
  const { data: session } = useSession()
  const userName: string | undefined | null = session?.user?.name
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    id: id,
    title: title,
    text: text,
    userName: userName,
    publishUser: publishUser,
    publishDate: publishDate,
    updateUser: updateUser,
    updateDate: updateDate,
  })

  const [error, setError] = useState({ isError: false, message: '' })

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
        `${process.env.NEXT_PUBLIC_HOST}/api/deleteNote`,
        {
          body: JSON.stringify(formData),
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

      if (data?.brightspot_example_cma_next_NoteDelete) {
        const itemToRemoveId = data.brightspot_example_cma_next_NoteDelete?._id
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
        onClick={() => {
          setIsOpen(true)
        }}
        data-hide={isOpen ? true : null}
      >
        <div className={styles.noteForm}>
          <div className={styles.inputFieldTitle}>{formData.title}</div>
          <div className={styles.inputFieldText}>{formData.text}</div>
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
            className={styles.deleteButton}
            onClick={(e) => {
              e.stopPropagation()
              submitDeleteNote()
            }}
          >
            <TiTimes title="delete" className={styles.deleteIcon} />
          </button>
          {error && <span className={styles.error}>{error.message}</span>}
        </div>
      </div>
      {isOpen && (
        <Modal
          handleClose={() => setIsOpen(false)}
          isOpen={isOpen}
          id={id}
          userName={userName}
          formData={formData}
          setFormData={setFormData}
          title={title}
          text={text}
        />
      )}
    </>
  )
}

export default NoteCard
