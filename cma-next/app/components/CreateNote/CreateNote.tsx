import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import styles from './CreateNote.module.css'
import { useSession } from 'next-auth/react'
import { Data } from '../../pages'

type Props = {
  items: Data[]
  setItems: Dispatch<SetStateAction<Data[]>>
}

const CreateNote = ({ items, setItems }: Props) => {
  const { data: session } = useSession()
  const titleRef = useRef<HTMLInputElement>(null)
  const textRef = useRef<HTMLInputElement>(null)
  const userName: string | undefined | null = session?.user?.name
  const [error, setError] = useState({ isError: false, message: '' })

  useEffect(() => {
    if (error.isError) {
      const timeId = setTimeout(() => {
        setError({ isError: false, message: '' })
      }, 3000)
      return () => {
        clearTimeout(timeId)
      }
    }
  }, [error.isError, userName])

  const submitNewNote = async () => {
    const inputTitle = titleRef?.current?.value || null
    const inputText = textRef?.current?.value || null
    const dataToSubmit = {
      title: inputTitle,
      text: inputText,
      toolUser: userName,
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/createAndUpdateNote`,
        {
          body: JSON.stringify(dataToSubmit),
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

      const data = await response.json()
      if (data.brightspot_example_cma_next_NoteSave) {
        const newItem = data.brightspot_example_cma_next_NoteSave
        setItems([...items, newItem])
        if (titleRef?.current?.value) {
          titleRef.current.value = ''
        }
        if (textRef?.current?.value) {
          textRef.current.value = ''
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className={styles.createNoteForm}
      onSubmit={(e) => {
        e.preventDefault()
        submitNewNote()
      }}
    >
      <div className={styles.createNoteWrapper}>
        <h4 className={styles.label}>Title</h4>
        <input
          className={styles.createNoteInput}
          required
          aria-label="Title"
          ref={titleRef}
        />
        <h4 className={styles.label}>Text</h4>
        <input
          className={styles.createNoteInput}
          aria-label="Text"
          ref={textRef}
          required
        />
      </div>
      <div className={styles.createNoteBottom}>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
        {error.isError && <div className={styles.error}>{error.message}</div>}
      </div>
    </form>
  )
}

export default CreateNote
