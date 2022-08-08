import { useState, useEffect } from 'react'
import { TiTimes } from 'react-icons/ti'
import styles from '../styles/NoteCard.module.css'
import { useSession } from 'next-auth/react'
import Modal from './Modal'

type Props = {
  title: string
  text: string
  id: string
  getItems: Function
}

const NoteCard = ({ title, text, id, getItems }: Props) => {
  const { data: session } = useSession()
  const userName: string | undefined | null = session?.user?.name
  const [isOpen, setIsOpen] = useState(false)
  const [editFormState, setEditFormState] = useState({
    id: id,
    currentTitle: title,
    currentText: text,
    userName: '',
  })

  const [error, setError] = useState({ isError: false, message: '' })

  useEffect(() => {
    setEditFormState({
      ...editFormState,
      userName: userName || '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, text, id])

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

  if (error.isError) return <div>{error.message}</div>

  return (
    <>
      <div
        className={styles.noteCard}
        key={id}
        onClick={() => setIsOpen(true)}
        data-hide={isOpen ? true : null}
      >
        <div className={styles.noteForm}>
          <div className={styles.inputField}>{editFormState.currentTitle}</div>
          <div className={styles.inputField} id={`text for id ${id}`}>
            {editFormState.currentText}
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
            <TiTimes title='delete' className={styles.deleteIcon} />
          </button>
        </div>
      </div>
      {isOpen && (
        <Modal
          handleClose={() => setIsOpen(false)}
          isOpen={isOpen}
          title={title}
          text={text}
          id={id}
          getItems={getItems}
          setEditFormState={setEditFormState}
          editFormState={editFormState}
        />
      )}
    </>
  )
}

export default NoteCard
