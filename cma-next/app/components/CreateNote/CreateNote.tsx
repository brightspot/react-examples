import { useState, useRef, useEffect } from 'react'
import styles from './CreateNote.module.css'
import { useSession } from 'next-auth/react'
import { Data } from '../../pages'

type Props = {
  getItems: () => void
}

const CreateNote = ({ getItems }: Props) => {
  const { data: session } = useSession()
  const titleRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const userName: string | undefined | null = session?.user?.name
  const [error, setError] = useState({ isError: false, message: '' })
  const [formState, setFormState] = useState({
    id: '',
    title: '',
    text: '',
    toolUser: userName,
  })

  useEffect(() => {
    const timeId = setTimeout(() => {
      setError({ isError: false, message: '' })
      setFormState({
        id: '',
        title: '',
        text: '',
        toolUser: userName,
      })
      if (titleRef?.current?.innerText) {
        titleRef.current.innerText = ''
      }
      if (textRef?.current?.innerText) {
        textRef.current.innerText = ''
      }
    }, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, [error.isError, userName])

  const submitNewNote = async () => {
    if (!titleRef.current?.innerText || !textRef.current?.innerText) {
      alert('please be sure your note has a title and text')
      return
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/createAndUpdateNote`,
      {
        body: JSON.stringify(formState),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (!response.ok) {
      setError({
        isError: true,
        message: 'cannot create a note ' + response.statusText,
      })
      throw new Error()
    }

    await response.json().then((response) => {
      if (response) {
        getItems()
        setFormState({
          id: '',
          title: '',
          text: '',
          toolUser: userName,
        })
        if (titleRef?.current?.innerText) {
          titleRef.current.innerText = ''
        }
        if (textRef?.current?.innerText) {
          textRef.current.innerText = ''
        }
      }
    })
  }

  return (
    <div className={styles.createNoteForm}>
      <div className={styles.createNoteWrapper}>
        <h4 className={styles.label}>Title</h4>
        <div
          contentEditable="true"
          className={styles.createNoteInput}
          aria-label="Title"
          role="textbox"
          ref={titleRef}
          onBlur={(e) => {
            setFormState({
              ...formState,
              title: e.currentTarget.innerText,
            })
          }}
        ></div>
        <h4 className={styles.label}>Text</h4>
        <div
          contentEditable="true"
          className={styles.createNoteInput}
          aria-label="Text"
          role="textbox"
          ref={textRef}
          onBlur={(e) => {
            setFormState({
              ...formState,
              text: e.currentTarget.innerText,
            })
          }}
        ></div>
      </div>
      <div className={styles.createNoteBottom}>
        <button
          className={styles.submitButton}
          onClick={(e) => {
            e.preventDefault()
            submitNewNote()
          }}
        >
          Submit
        </button>
        {error.isError && <div className={styles.error}>{error.message}</div>}
      </div>
    </div>
  )
}

export default CreateNote
