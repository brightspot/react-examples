import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import styles from './CreateNoteForm.module.css'
import { Data } from '../../pages'

type Props = {
  items: Data[]
  setItems: Dispatch<SetStateAction<Data[]>>
}

const CreateNote = ({ items, setItems }: Props) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
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
  }, [error.isError])

  const submitNewNote = async () => {
    const inputTitle = titleRef?.current?.value || null
    const inputDescription = descriptionRef?.current?.value || null
    const inputUsername = usernameRef?.current?.value || null
    const dataToSubmit = {
      title: inputTitle,
      description: inputDescription,
      toolUser: inputUsername,
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/notes/new`,
        {
          body: JSON.stringify(dataToSubmit),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.status >= 400) {
        setError({
          isError: true,
          message:
            'Cannot create note. First, confirm Username in Brightspot... ',
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
        if (descriptionRef?.current?.value) {
          descriptionRef.current.value = ''
        }
        if (usernameRef?.current?.value) {
          usernameRef.current.value = ''
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
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          className={styles.createNoteInput}
          required
          name="title"
          aria-label="Title"
          ref={titleRef}
        />
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <input
          className={styles.createNoteInput}
          aria-label="Description"
          ref={descriptionRef}
          required
          name="description"
        />
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          className={styles.createNoteInput}
          aria-label="User name"
          ref={usernameRef}
          required
          name="username"
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
